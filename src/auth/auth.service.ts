import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: CreateUserDto) {
    const user = await this.usersService.findOne(loginDto.username);
    if (user?.username && user.password) {
      if (!(await bcrypt.compare(loginDto.password, user?.password))) {
        throw new UnauthorizedException();
      }
      const payload = { sub: user.id, username: user.username };
      return await this.jwtService.signAsync(payload);
    } else {
      throw new HttpException('User not found', HttpStatus.FORBIDDEN); //Extremely ugly, will be fixed for sure
    }
  }

  async register(registerDto: CreateUserDto) {
    await this.usersService.create(registerDto);
    return 'Registered';
  }
}
