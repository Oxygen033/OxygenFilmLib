import {
  Controller,
  Get,
  Post,
  Patch,
  Req,
  Param,
  Body,
  Delete,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CreateFilmDTO } from './dto/create-film.dto';
import { UpdateFilmDTO } from './dto/update-film.dto';
import { FilmsService } from './films.service';
import { Request } from 'express';
import { Film } from './entites/film.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { Role } from '../auth/roles/role.enum';

@Controller('/films')
export class FilmsController {
  constructor(
    @InjectRepository(Film)
    private filmsRepository: Repository<Film>,
    private readonly filmsService: FilmsService,
  ) {}

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  create(@Body() createFilmDto: CreateFilmDTO, @Req() req: Request) {
    return this.filmsService.create(createFilmDto, req);
  }

  @Get()
  findAll() {
    return this.filmsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.filmsService.findOne(id);
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id')
  async update(
    @Param('id') Id: number,
    @Body() updateFilmDto: UpdateFilmDTO,
    @Req() req: Request,
  ) {
    await this.filmsRepository.findOneBy({ id: Id }).then((result) => {
      if (result?.addedBy != req.id) {
        throw new UnauthorizedException();
      }
    });
    return this.filmsService.update(Id, updateFilmDto);
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  async remove(@Param('id') Id: number, @Req() req: Request) {
    await this.filmsRepository.findOneBy({ id: Id }).then((result) => {
      if (result?.addedBy != req.id) {
        throw new UnauthorizedException();
      }
    });
    return this.filmsService.remove(Id);
  }
}
