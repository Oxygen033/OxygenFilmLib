import { Injectable } from '@nestjs/common';
import { UpdateFilmDTO } from './dto/update-film.dto';
import { CreateFilmDTO } from './dto/create-film.dto';

//Placeholder
@Injectable()
export class FilmsService {
  create(createFilmDTO: CreateFilmDTO) {
    return 'Film created';
  }

  findAll() {
    return 'all films';
  }

  findOne(id: number) {
    return `film ${id}`;
  }

  update(id: number, updateFilmDTO: UpdateFilmDTO) {
    return `This action updates a #${id} film`;
  }

  remove(id: number) {
    return `This action removes a #${id} film`;
  }
}
