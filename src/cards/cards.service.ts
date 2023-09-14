import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CardDto } from './dto/card.dto';
import { CardsRepository } from './cards.repository';
import { ConfigService } from '@nestjs/config';
import Cryptr from 'cryptr';

@Injectable()
export class CardsService {
  private config: ConfigService;
  private cryptr: Cryptr;

  constructor(
    configService: ConfigService,
    private readonly cardsRepository: CardsRepository,
  ) {
    const Cryptr = require('cryptr');
    this.config = configService;
    const secretKey = this.config.get<string>('CRYPTR_SECRET');
    this.cryptr = new Cryptr(secretKey);
  }

  async create(userId: number, cardDto: CardDto) {
    const checkbytitle = await this.cardsRepository.findByTitle(
      userId,
      cardDto.title,
    );

    if (checkbytitle) throw new ConflictException('Card already exists');

    const cryptPassword = this.cryptr.encrypt(cardDto.password);
    const cryptCVV = this.cryptr.encrypt(cardDto.cvv);
    cardDto.cvv = cryptCVV;
    cardDto.cvv = cryptPassword;

    return this.cardsRepository.create(userId, cardDto);
  }

  async findAll(userId: number) {
    const cards = await this.cardsRepository.findAll(userId);
    if (cards.length === 0) return cards
    return cards.map((card) => {
      const uncryptPassword = this.cryptr.decrypt(card.password);
      const uncryptCvv = this.cryptr.decrypt(card.cvv);
      card.cvv = uncryptCvv;
      card.password = uncryptPassword;
      return card
    });
  }

  async findOne(userId: number, id: number) {
    const card = await this.cardsRepository.findOne(id);
    
    if (!card) throw new NotFoundException();

    if (card) {
      if (card.userId !== userId) throw new ForbiddenException();

      const uncryptPassword = this.cryptr.decrypt(card.password);
      const uncryptCvv = this.cryptr.decrypt(card.cvv);
      card.cvv = uncryptCvv;
      card.password = uncryptPassword
      return card
    }
  }

  async remove(userId: number, id: number) {
    const card = await this.cardsRepository.findOne(id);
    
    if (!card) throw new NotFoundException();

    if (card.userId !== userId) throw new ForbiddenException();

    return this.cardsRepository.remove(userId, id);
  }
}
