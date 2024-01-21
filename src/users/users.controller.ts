import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':username')
  findOne(@Param('username') username: string, @Req() req: Request) {
    if ((req.username ?? '') === username) {
      return this.usersService.findOne(username);
    } else {
      throw new UnauthorizedException();
    }
  }

  @UseGuards(AuthGuard)
  @Patch(':username')
  update(
    @Param('username') username: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: Request,
  ) {
    if ((req.username ?? '') === username) {
      return this.usersService.update(username, updateUserDto);
    } else {
      throw new UnauthorizedException();
    }
  }

  @UseGuards(AuthGuard)
  @Delete(':username')
  remove(@Param('username') username: string, @Req() req: Request) {
    if ((req.username ?? '') === username) {
      return this.usersService.remove(username);
    } else {
      throw new UnauthorizedException();
    }
  }
}
