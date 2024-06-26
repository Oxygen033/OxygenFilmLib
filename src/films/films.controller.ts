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
  UseInterceptors,
  UploadedFile,
  ValidationPipe,
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
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { NotFoundException } from '@nestjs/common';

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
  @UseInterceptors(
    FileInterceptor('poster', {
      storage: diskStorage({
        destination: './media',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
          cb(null, filename);
        },
      }),
    }),
  )
  create(
    @UploadedFile() poster: Express.Multer.File,
    @Body() createFilmDto: CreateFilmDTO,
    @Req() req: Request,
  ) {
    if (poster) {
      createFilmDto.poster = poster.filename;
    }
    return this.filmsService.create(createFilmDto, req);
  }

  @Get()
  findAll() {
    return this.filmsService.findAll();
  }

  @Get('count/:count')
  findN(@Param('count') count: number) {
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
    const film = await this.filmsService.findOne(Id);
    return {
      message: `User ${req.username} (${req.id}) ${
        likeState ? '' : 'un'
      }liked film with id ${Id}`,
      film,
    };
  }

  @UseGuards(AuthGuard)
  @Post('watch/:id')
  async watch(@Param('id') Id: number, @Req() req: Request) {
    const watchState = await this.filmsService.watch(Id, req.id);
    const film = await this.filmsService.findOne(Id);
    return {
      message: `User ${req.username} (${req.id}) ${
        watchState ? '' : 'un'
      }watched film with id ${Id}`,
      film,
    };
  }

  @UseGuards(AuthGuard)
  @Post('rate/:id/:rate')
  async rate(
    @Param('id') Id: number,
    @Param('rate') rate: number,
    @Req() req: Request,
  ) {
    if (rate > 5 || rate < 0.5 || rate % 0.5 != 0) {
      throw new BadRequestException('Invalid rating value');
    }
    return await this.filmsService.rate(Id, req.id, rate);
  }

  @Get(':id/rating/:username')
  async getRatingByUsername(
    @Param('id') filmId: number,
    @Param('username') username: string,
  ) {
    const rating = await this.filmsService.getRatingByUsername(
      filmId,
      username,
    );
    if (!rating) {
      throw new NotFoundException(
        `Rating not found for user ${username} on film ${filmId}`,
      );
    }
    return { rating: rating.rating };
  }

  @Get(':id/ratings/:count')
  async getLastFiveRatings(
    @Param('id') id: number,
    @Param('count') count: number,
  ) {
    return this.filmsService.getLastRatings(id, count);
  }

  @UseGuards(AuthGuard)
  @Post('unrate/:id')
  async unrate(@Param('id') Id: number, @Req() req: Request) {
    return await this.filmsService.unrate(Id, req.id);
  }
}
