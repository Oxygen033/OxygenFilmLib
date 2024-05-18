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

  async create(createFilmDTO: CreateFilmDTO, req: Request) {
    const film = new Film();
    film.title = createFilmDTO.title;
    film.description = createFilmDTO.description;
    film.releaseDate = createFilmDTO.releaseDate;
    film.country = createFilmDTO.country;
    film.director = createFilmDTO.director;
  
    film.assistDirector = createFilmDTO.assistDirector ? JSON.parse(createFilmDTO.assistDirector) : undefined;
    film.cast = createFilmDTO.cast ? JSON.parse(createFilmDTO.cast) : undefined;
    film.producers = createFilmDTO.producers ? JSON.parse(createFilmDTO.producers) : undefined;
    film.execProducers = createFilmDTO.execProducers ? JSON.parse(createFilmDTO.execProducers) : undefined;
    film.writers = createFilmDTO.writers ? JSON.parse(createFilmDTO.writers) : undefined;
    film.artDirection = createFilmDTO.artDirection ? JSON.parse(createFilmDTO.artDirection) : undefined;
    film.composers = createFilmDTO.composers ? JSON.parse(createFilmDTO.composers) : undefined;
    film.songs = createFilmDTO.songs ? JSON.parse(createFilmDTO.songs) : undefined;
    film.sound = createFilmDTO.sound ? JSON.parse(createFilmDTO.sound) : undefined;
    film.genres = createFilmDTO.genres ? JSON.parse(createFilmDTO.genres) : undefined;
  
    film.poster = createFilmDTO.poster === "null" ? undefined : createFilmDTO.poster;
    film.screenshots = createFilmDTO.screenshots ? JSON.parse(createFilmDTO.screenshots) : undefined;
  
    film.addDate = new Date(Date.now());
    film.addedBy = req.id ?? -1;
  
    return await this.filmsRepository.save(film);
  }
  
  

  async findAll() {
    return await this.filmsRepository.find();
  }

  async findN(count: number) {
    return await this.filmsRepository.find({take: count});
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

  async watch(filmId: number, userId: number): Promise<boolean> {
    const watched = await this.usersRepository.exist({
      where: {
        id: userId,
        watchedFilms: {
          id: filmId,
        },
      },
      relations: ['watchedFilms'],
    });
    if (watched) {
      await this.dataSource
        .createQueryBuilder()
        .relation(User, 'watchedFilms')
        .of(userId)
        .remove(filmId);
      return false;
    } else {
      await this.dataSource
        .createQueryBuilder()
        .relation(User, 'watchedFilms')
        .of(userId)
        .add(filmId);
      return true;
    }
  }

  async rate(filmId: number, userId: number, rating: number): Promise<FilmRating> {
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
  
    await this.filmRatingsRepository.save(filmRating);
    await this.updateOverallRating(filmId);
    return filmRating;
  }

  async unrate(filmId: number, userId: number) {
    let filmRating = await this.filmRatingsRepository.findOne({
      where: { user: { id: userId }, film: { id: filmId } },
    });

    if (filmRating) {
      await this.updateOverallRating(filmId);
      return await this.filmRatingsRepository.delete({
        film: { id: filmId },
        user: { id: userId }
      });
    } else {
      throw new UnauthorizedException();
    }
  }

  async updateOverallRating(filmId: number) {
    const film = await this.filmsRepository.findOne({
      where: { id: filmId },
      relations: ['ratings'],
    });

    if (film) {
      const ratings = film.ratings.map(rating => rating.rating);
      const overallRating = ratings.length > 0 ? ratings.reduce((a, b) => a + b) / ratings.length : 0;

      await this.dataSource
        .createQueryBuilder()
        .update(Film)
        .set({ overallRating })
        .where("id = :filmId", { filmId })
        .execute();
    }
  }
}
