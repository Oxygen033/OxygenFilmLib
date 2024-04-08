import { Controller, Post, Body, UseGuards, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: CreateUserDto, @Res() res: Response) {
    return this.authService.login(loginDto, res);
  }

  @Post('register')
  register(@Body() registerDto: CreateUserDto) {
    return this.authService.register(registerDto);
  }
}
