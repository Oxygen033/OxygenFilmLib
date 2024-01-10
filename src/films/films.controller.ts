import {
  Controller,
  Get,
  Post,
  Patch,
  Query,
  Req,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
  Delete,
  HttpCode,
  UnauthorizedException,
  UseGuards,
  UseFilters,
} from '@nestjs/common';
import { CreateFilmDTO } from './dto/create-film.dto';
import { UpdateFilmDTO } from './dto/update-film.dto';
import { FilmsService } from './films.service';
import { Request } from 'express';
import { Film } from './entites/film.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthGuard } from '../auth/auth.guard';

@Controller('/films')
export class FilmsController {
  constructor(
    @InjectRepository(Film)
    private filmsRepository: Repository<Film>,
    private readonly filmsService: FilmsService,
  ) {}

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
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
