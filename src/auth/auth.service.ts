import { ForbiddenException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  logIn() {
    return { msg: 'This action logs a user in' };
  }

  async signUp(dto: AuthDto) {
    const hashedPassword = await argon.hash(dto.password);

    const userExists = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (userExists) {
      throw new ForbiddenException('User already exists');
    }

    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          firstName: dto.firstName,
          lastName: dto.lastName,
          hash: hashedPassword,
        },
      });
      delete user.hash;
      return user;
    } catch (error) {
      if (error) {
        throw new Error(error.message);
      }
    }
  }
}
