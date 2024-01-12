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
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { Role } from '../auth/roles/role.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private reflector: Reflector) {}

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
    if (((req.username ?? '') === username) || req.roles.includes(Role.Admin)) {
      return this.usersService.remove(username);
    } else {
      throw new UnauthorizedException();
    }
  }
}
