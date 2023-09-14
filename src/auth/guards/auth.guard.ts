import { CanActivate, ExecutionContext, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { UsersService } from "src/auth/users.service";
import { User } from "@prisma/client";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private userService: UsersService
  ) { }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    try {
      const data = this.authService.checkToken((authorization ?? "").split(" ")[1]);
      const user = await this.userService.findById(parseInt(data.sub));
      delete user.password
      request.user = user;
      return true;
    } catch (error) {
      if(!error.response.error)throw new InternalServerErrorException("while JWT Guard authentication");
      throw error
    }
  }

}

export type UserBody = Omit<User,'password'>