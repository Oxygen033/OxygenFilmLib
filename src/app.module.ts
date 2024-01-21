import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilmsModule } from './films/films.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Film } from './films/entites/film.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'media'),
      serveRoot: '/media',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345678',
      database: 'FilmLibDatabase',
      entities: [],
      autoLoadEntities: true,
      synchronize: true
    }),
    FilmsModule,
    UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
