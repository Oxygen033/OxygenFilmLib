import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateFilmDTO } from './dto/update-film.dto';
import { CreateFilmDTO } from './dto/create-film.dto';
import { Film } from './entites/film.entity';

//Placeholder
@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(Film)
    private filmsRepository: Repository<Film>
  ) {}

  async create(createFilmDTO: CreateFilmDTO) {
    const film = new Film();
    film.title = createFilmDTO.title;
    film.description = createFilmDTO.description;
    film.releaseDate = createFilmDTO.releaseDate;
    film.addDate = new Date(Date.now());
    film.addedBy = 0; //Until users not implemented
    film.poster = createFilmDTO.poster;
    film.screenshots = createFilmDTO.screenshots;
    await this.filmsRepository.save(film);
    return 'Created';
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
}
