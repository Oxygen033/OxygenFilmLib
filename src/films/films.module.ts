import { Module } from '@nestjs/common';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './entites/film.entity';
import { JwtModule } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { FilmRating } from './entites/film-rating.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Film, User, FilmRating]), JwtModule],
    exports: [TypeOrmModule, FilmsService],
    controllers: [FilmsController],
    providers: [FilmsService],
})
export class FilmsModule {}
