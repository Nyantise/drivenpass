import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from "bcrypt";
import { UsersService } from './users.service';
import { SignInUpDto } from './dto/sign-in-up.dto';

@Injectable()
export class AuthService {

  private EXPIRATION_TIME = "30m";
  private ISSUER = "Driven";
  private AUDIENCE = "users";

  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService) { }

  async signUp(signUpDto: SignInUpDto) {
    const user = await this.usersService.findByEmail(signUpDto.email);
    if (user) throw new ConflictException("email already in use.")

    return await this.usersService.create(signUpDto);
  }

  async signIn(signInDto: SignInUpDto) {
    const { email, password } = signInDto;

    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException(`Email or password not valid.`);

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new UnauthorizedException(`Email or password not valid.`);

    return this.createToken(user);
  }

  private async createToken(user: User) {
    const { id, email } = user;

    const token = await this.jwtService.signAsync({ email }, {
      expiresIn: this.EXPIRATION_TIME,
      subject: String(id),
      issuer: this.ISSUER,
      audience: this.AUDIENCE
    });

    return { token }
  }

  checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        audience: this.AUDIENCE,
        issuer: this.ISSUER
      });

      return data;
    } catch (error) {
      const JwtError = String(error).split("\n")[0]
      throw new UnauthorizedException(JwtError);
    }
  }
}