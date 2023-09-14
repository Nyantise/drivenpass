import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt'
import { SignInUpDto } from 'src/auth/dto/sign-in-up.dto';

@Injectable()
export class UsersService {
  constructor(private readonly repository:UsersRepository) {}

  async create(signUpDto: SignInUpDto) {
    const { password } = signUpDto;
    
    const hashPass = await bcrypt.hash(password, 12);
    signUpDto.password = hashPass

    return this.repository.create(signUpDto);
  }

  async findById(id: number) {
    const user = await this.repository.findOne(id);
    if (!user) throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    return user;
  }

  async update(id: number, updateUserDto: SignInUpDto) {
    const user = await this.findById(id);
    if (!user) throw new HttpException("User not found", HttpStatus.NOT_FOUND);

    return this.repository.update(id, updateUserDto);
  }

  async remove(userId: number, password: string) {
    const user = await this.findById(userId);
    const hashCheck = await bcrypt.compare(user.password, password);
    if (!hashCheck) throw new UnauthorizedException('Invalid password');

    return this.repository.remove(userId);
  }


  async findByEmail(email: string) {
    return this.repository.findOneByEmail(email);
  }
}
