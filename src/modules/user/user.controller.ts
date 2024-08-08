import { Body, Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findById_service(id);
  }

  @Get()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser_service(createUserDto);
  }
}
