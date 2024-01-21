import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = new User();
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    await this.usersRepository.save(user);
    return 'Created';
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(Id: number) {
    return await this.usersRepository.findOneBy({id: Id});
  }

  async update(Id: number, updateUserDto: UpdateUserDto) {
    const user = new User();
    user.username = updateUserDto.username;
    user.password = updateUserDto.password;
    await this.usersRepository.update({id: Id}, user);
    return await this.usersRepository.findOneBy({id: Id});
  }

  async remove(Id: number) {
    this.usersRepository.delete({id: Id});
    return 'Deleted';
  }
}
