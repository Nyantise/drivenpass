import { Controller, Body, Delete, HttpStatus, HttpCode, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './decorators/user.decorator';
import { AuthGuard, UserBody } from './guards/auth.guard';
import { EraseDto } from './dto/erase.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Delete("erase")
  @UseGuards(AuthGuard)
  @HttpCode(200)
  @ApiTags('Erase')
  @ApiOperation({ summary: 'Deletes the user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'User deleted' })
  @ApiBearerAuth()
  async erase(
    @User() user: UserBody,
    @Body() body: EraseDto) {
    return await this.usersService.remove(user.id, body.password);
  }

}
