import { Controller, Get, Post, Request, Param, Body } from '@nestjs/common';
import { CreateFilmDTO } from 'src/dto/films.dto';

@Controller('/films')
export class FilmsController 
{
    @Post()
    async create(@Body() CreateFilmDTO: CreateFilmDTO)
    {
        return 'new film added';
    }
}
