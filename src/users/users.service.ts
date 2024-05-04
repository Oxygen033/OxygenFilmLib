import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from '../auth/roles/role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = new User();
    user.username = createUserDto.username;
    const hash = await bcrypt.hash(createUserDto.password, 10);
    user.password = hash;
    //user.roles = [Role.User];
    return await this.usersRepository.save(user);
  }

  async findAll() {
    return await this.usersRepository.find({relations: ['likedFilms', 'filmsRatings', 'watchedFilms']});
  }

  async findOne(Username: string) {
    return await this.usersRepository.createQueryBuilder('user')
    .where({ username: Username})
    .select(['user','likedFilm.id', 'likedFilm.title', 'watchedFilm.id', 'watchedFilm.title', 'filmRatings'])
    .leftJoin('user.likedFilms', 'likedFilm')
    .leftJoin('user.watchedFilms', 'watchedFilm')
    .leftJoin('user.filmsRatings', 'filmRatings')
    .getOne();
  }

  async update(Username: string, updateUserDto: UpdateUserDto) {
    const user = new User();
    user.username = updateUserDto.username;
    if (updateUserDto.password) {
      const hash = await bcrypt.hash(updateUserDto.password, 10);
      user.password = hash;
    }
    await this.usersRepository.update({ username: Username }, user);
    return await this.usersRepository.findOneBy({ username: updateUserDto.username });
  }

  async remove(Username: string) {
    this.usersRepository.delete({ username: Username });
    return 'Deleted';
  }
}
