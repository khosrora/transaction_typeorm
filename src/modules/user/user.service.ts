import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entities';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findById_service(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) return new NotFoundException();
    return user;
  }
  async createUser_service(createUserDto: CreateUserDto) {
    const { mobile } = createUserDto;
    let user = await this.userRepository.findOneBy({ mobile });
    if (!user) {
      user = this.userRepository.create(createUserDto);
      await this.userRepository.save(user);
    }
    return user;
  }
}
