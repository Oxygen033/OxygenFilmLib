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
  BadRequestException,
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

  @Get('count/:count')
  findN(@Param('count') count:number) {
    return this.filmsService.findN(count);
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

  @UseGuards(AuthGuard)
  @Post('like/:id')
  async like(@Param('id') Id: number, @Req() req: Request) {
    const likeState = await this.filmsService.like(Id, req.id);
    return `User ${req.username} (${req.id}) ${likeState ? '' : 'un'}liked film with id ${Id}`;
  }

  @UseGuards(AuthGuard)
  @Post('watch/:id')
  async watch(@Param('id') Id: number, @Req() req: Request) {
    const watchState = await this.filmsService.watch(Id, req.id);
    return `User ${req.username} (${req.id}) ${watchState ? '' : 'un'}watched film with id ${Id}`;
  }

  @UseGuards(AuthGuard)
  @Post('rate/:id/:rate')
  async rate(@Param('id') Id: number, @Param('rate') rate: number, @Req() req: Request)
  {
    if(rate > 5 || rate < 0.5 || (rate % 0.5) != 0)
    {
      throw new BadRequestException('Invalid rating value');
    }
    return await this.filmsService.rate(Id, req.id, rate);
  }

  @UseGuards(AuthGuard)
  @Post('unrate/:id')
  async unrate(@Param('id') Id: number, @Req() req: Request)
  {
    return await this.filmsService.unrate(Id, req.id);
  }
}
