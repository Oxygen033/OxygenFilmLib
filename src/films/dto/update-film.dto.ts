import { PartialType } from '@nestjs/mapped-types';
import { CreateFilmDTO } from './create-film.dto';

export class UpdateFilmDTO extends PartialType(CreateFilmDTO) {}
