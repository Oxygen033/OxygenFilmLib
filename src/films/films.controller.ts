import { Controller, Get, Post, Patch, Query, Request, Param, Body, UsePipes, ValidationPipe, Delete } from '@nestjs/common';
import { CreateFilmDTO} from './dto/create-film.dto';
import { UpdateFilmDTO } from './dto/update-film.dto';
import { FilmsService } from './films.service';

@Controller('/films')
export class FilmsController 
{
    constructor(private readonly filmsService: FilmsService) {}

    @Post()
    create(@Body() createFilmDto: CreateFilmDTO) {
      return this.filmsService.create(createFilmDto);
    }
  
    @Get()
    findAll() {
      return this.filmsService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.filmsService.findOne(+id);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateFilmDto: UpdateFilmDTO) {
      return this.filmsService.update(+id, updateFilmDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.filmsService.remove(+id);
    }
}