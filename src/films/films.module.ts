import { Module } from '@nestjs/common';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './entites/film.entity';
import { JwtModule } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Film, User]), JwtModule],
    exports: [TypeOrmModule],
    controllers: [FilmsController],
    providers: [FilmsService],
})
export class FilmsModule {}
