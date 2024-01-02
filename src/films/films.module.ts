import { Module } from '@nestjs/common';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

@Module({
    controllers: [FilmsController],
    providers: [FilmsService],
})
export class FilmsModule {}
