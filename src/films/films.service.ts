import { HttpException, HttpStatus, Injectable, Req } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateFilmDTO } from './dto/update-film.dto';
import { CreateFilmDTO } from './dto/create-film.dto';
import { Film } from './entites/film.entity';
import { Request } from 'express';
import { DataSource } from 'typeorm';
import { User } from '../users/entities/user.entity';

//Placeholder
@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(Film)
    private filmsRepository: Repository<Film>,
    private dataSource: DataSource
  ) {}

  async create(createFilmDTO: CreateFilmDTO, @Req() req: Request) {
    const film = new Film();
    film.title = createFilmDTO.title;
    film.description = createFilmDTO.description;
    film.releaseDate = createFilmDTO.releaseDate;
    film.country = createFilmDTO.country;
    film.director = createFilmDTO.director;
    film.assistDirector = createFilmDTO.assistDirector;
    film.cast = createFilmDTO.cast;
    film.producers = createFilmDTO.producers;
    film.execProducers = createFilmDTO.execProducers;
    film.writers = createFilmDTO.writers;
    film.artDirection = createFilmDTO.artDirection;
    film.composers = createFilmDTO.composers;
    film.songs = createFilmDTO.songs;
    film.sound = createFilmDTO.sound;
    film.genres = createFilmDTO.genres;
    film.poster = createFilmDTO.poster;
    film.screenshots = createFilmDTO.screenshots;
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
    film.title = updateFilmDTO.title;
    film.description = updateFilmDTO.description;
    film.releaseDate = updateFilmDTO.releaseDate;
    film.poster = updateFilmDTO.poster;
    film.screenshots = updateFilmDTO.screenshots;
    await this.filmsRepository.update({id: Id}, film);
    return await this.filmsRepository.findOneBy({id: Id});
  }

  async remove(Id: number) {
    await this.filmsRepository.delete({id: Id});
    return 'Deleted';
  }

  //Stub
  async like(filmId: number, userId: number) {
    return await this.dataSource.createQueryBuilder().relation(User, "likedFilms").of(userId).add(filmId);
  }
  //Stub
  async unlike(filmId: number, userId: number) {
    return await this.dataSource.createQueryBuilder().relation(User, "likedFilms").of(userId).remove(filmId);
  }
}
