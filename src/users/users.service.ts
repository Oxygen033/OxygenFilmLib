import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

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
    await this.usersRepository.save(user);
    return await this.usersRepository.findOneBy({ username: createUserDto.username });
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(Username: string) {
    return await this.usersRepository.findOneBy({ username: Username });
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
