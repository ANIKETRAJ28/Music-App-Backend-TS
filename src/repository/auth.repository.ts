import { prisma } from '../config/db.config';
import bcrypt from 'bcrypt';
import { IUserRegister, IUserResponse } from '../interface/user.interface';
import { UserRepository } from './user.repository';
import { getAvatar } from '../util/avatar.util';
import { IRegister } from '../interface/register.interface';
import crypto from 'crypto';
import { BadRequest, Unauthorized } from '../util/ApiResponse.util';

export class AuthRepository {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async register(email: string): Promise<string> {
    try {
      let user: IRegister | null = await prisma.registUser.findUnique({ where: { email } });
      const randomBytes = crypto.randomBytes(3); // Generate 3 random bytes (24 bits) using the crypto module
      const randomNumber = parseInt(randomBytes.toString('hex'), 16); // Convert the random bytes to a hexadecimal string and then parse it as an integer
      const sixDigitNumber = (randomNumber % 1000000) + ''; // Take the result modulo 1000000 to ensure it is a 6-digit number
      const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
      if (!user) {
        user = await prisma.registUser.create({ data: { email, otp: sixDigitNumber, expireyAt: otpExpiry } });
        return user.email;
      }
      if (user.isRegistered) throw new BadRequest('User already registered.');
      await prisma.registUser.update({ where: { email }, data: { otp: sixDigitNumber, expireyAt: otpExpiry } });
      return user.email;
    } catch (error) {
      console.error('Error occurred in register method in AuthRepository:', error);
      throw error;
    }
  }

  async verifyOtp(email: string, otp: string): Promise<string> {
    try {
      let user = await prisma.registUser.findUnique({ where: { email } });
      if (!user) throw new Unauthorized('User not registered.');
      if (user.isRegistered) throw new BadRequest('User already registered.');
      if (otp !== user.otp) throw new BadRequest('Invalid OTP.');
      if (user.expireyAt < new Date()) throw new BadRequest('OTP expired.');
      user = await prisma.registUser.update({
        where: { email },
        data: { isRegistered: true },
      });
      const createdUser = await this.userRepository.createUser(email);
      return createdUser.id;
    } catch (error) {
      console.error('Error occurred in verifyOtp method in AuthRepository:', error);
      throw error;
    }
  }

  async loginByEmail(email: string, password: string): Promise<IUserResponse> {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
        include: { defaultPlaylist: true },
      });
      if (!user || !user.password || !user.username) throw new Error('Incorrect email or password.');
      const isMatch = bcrypt.compare(password, user.password);
      if (!isMatch) throw new Error('Incorrect email or password.');
      const avatar = getAvatar(user.username);
      return { ...user, avatar };
    } catch (error) {
      console.error('Error occurred in loginByEmail method in AuthRepository:', error);
      throw error;
    }
  }

  async loginByUsername(username: string, password: string): Promise<IUserResponse> {
    try {
      const user = await prisma.user.findUnique({
        where: { username },
        include: { defaultPlaylist: true },
      });
      if (!user || !user.password || !user.username) throw new Error('Incorrect email or password.');
      const isMatch = bcrypt.compare(password, user.password);
      if (!isMatch) throw new Error('Incorrect email or password.');
      const avatar = getAvatar(user.username);
      return { ...user, avatar };
    } catch (error) {
      console.error('Error occurred in loginByUsername method in AuthRepository:', error);
      throw error;
    }
  }

  async completeRegister(user: IUserRegister): Promise<IUserResponse> {
    try {
      return this.userRepository.updateUserById(user);
    } catch (error) {
      console.error('Error occurred in completeRegister method in AuthRepository:', error);
      throw error;
    }
  }
}
