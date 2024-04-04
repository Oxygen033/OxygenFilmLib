import { HttpException, HttpStatus, Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateFilmDTO } from './dto/update-film.dto';
import { CreateFilmDTO } from './dto/create-film.dto';
import { Film } from './entites/film.entity';
import { Request } from 'express';
import { DataSource } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { FilmRating } from './entites/film-rating.entity';

//Placeholder
@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(Film)
    private filmsRepository: Repository<Film>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(FilmRating)
    private filmRatingsRepository: Repository<FilmRating>,
    private dataSource: DataSource
  ) {}

  async create(createFilmDTO: CreateFilmDTO, @Req() req: Request) {
    const film = new Film();
    Object.assign(film, { ...createFilmDTO });
    film.addDate = new Date(Date.now());
    film.addedBy = req.id ?? -1;
    return await this.filmsRepository.save(film);
  }

  async findAll() {
    return await this.filmsRepository.find();
  }

  async findOne(Id: number) {
    return await this.filmsRepository.findOneBy({id: Id});
  }

  async update(Id: number, updateFilmDTO: UpdateFilmDTO) {
    const film = new Film();
    Object.assign(film, { ...updateFilmDTO });
    await this.filmsRepository.update({id: Id}, film);
    return await this.filmsRepository.findOneBy({id: Id});
  }

  async remove(Id: number) {
    await this.filmsRepository.delete({id: Id});
  }

  //Returns true if liked and false if unliked
  async like(filmId: number, userId: number): Promise<boolean> {
    const liked = await this.usersRepository.exist({
      where: {
        id: userId,
        likedFilms: {
          id: filmId,
        },
      },
      relations: ['likedFilms'],
    });
    if (liked) {
      await this.dataSource
        .createQueryBuilder()
        .relation(User, 'likedFilms')
        .of(userId)
        .remove(filmId);
      return false;
    } else {
      await this.dataSource
        .createQueryBuilder()
        .relation(User, 'likedFilms')
        .of(userId)
        .add(filmId);
      return true;
    }
  }

  async rate(filmId: number, userId: number, rating:number): Promise<FilmRating> {
    let filmRating = await this.filmRatingsRepository.findOne({
      where: { user: { id: userId }, film: { id: filmId } },
    });
    if (filmRating) {
      filmRating.rating = rating;
    } else {
      filmRating = await this.filmRatingsRepository.create({
        user: { id: userId },
        film: { id: filmId },
        rating,
      });
    }
    return await this.filmRatingsRepository.save(filmRating);
  }

  async unrate(filmId: number, userId: number) {
    let filmRating = await this.filmRatingsRepository.findOne({
      where: { user: { id: userId }, film: { id: filmId } },
    });
    if(filmRating) {
      return await this.filmRatingsRepository.delete({
        film: {id: filmId},
        user: {id: userId}
      });
    } else {
      throw new UnauthorizedException();
    }
  }
}
