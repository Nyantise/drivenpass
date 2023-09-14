import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard, UserBody } from 'src/auth/guards/auth.guard';
import { CardsService } from './cards.service';
import { CardDto } from './dto/card.dto';
import { User } from 'src/auth/decorators/user.decorator';
import { ParseParamPipe } from 'src/utils/pipes/param.pipe';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@UseGuards(AuthGuard)
@ApiTags('Cards')
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The card has been created.',
  })
  @ApiBearerAuth()
  create(
    @User() user: UserBody,
    @Body() cardDto: CardDto) {
    return this.cardsService.create(user.id, cardDto);
  }

  @Get()
  @ApiOkResponse({ description: 'Returns all user´s cards.' })
  @ApiBearerAuth()
  findAll(@User() user: UserBody) {
    return this.cardsService.findAll(user.id);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Returns the card with specified id.' })
  @ApiNotFoundResponse({ description: 'Card not found.' })
  @ApiBearerAuth()
  findOne(
    @User() user: UserBody, 
    @Param('id', new ParseParamPipe) id: number) {
    return this.cardsService.findOne(user.id, id);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'The card has been deleted.' })
  @ApiNotFoundResponse({ description: 'Card not found.' })
  @ApiBearerAuth()
  remove(
    @User() user: UserBody, 
    @Param('id', new ParseParamPipe) id: number) {
    return this.cardsService.remove(user.id, +id);
  }
}
