import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInUpDto } from './dto/sign-in-up.dto';
import { AuthGuard, UserBody } from './guards/auth.guard';
import { User } from './decorators/user.decorator';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService) { }

  // create
  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() signUpDto: SignInUpDto) {
    return this.authService.signUp(signUpDto);
  }

  // login
  @Post("sign-in")
  @HttpCode(HttpStatus.OK)
  signIn(@Body() signInDto: SignInUpDto) {
    return this.authService.signIn(signInDto);
  }

  @UseGuards(AuthGuard)
  @Post("check")
  @HttpCode(200)
  check(@User() user:UserBody){
    return user
  }
}