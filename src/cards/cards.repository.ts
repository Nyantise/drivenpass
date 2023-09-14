import { Injectable } from '@nestjs/common';
import { CardDto } from './dto/card.dto';
import { PrismaService } from 'src/utils/prisma/prisma.service';

@Injectable()
export class CardsRepository {
  constructor(private prisma: PrismaService) {}
  async create(userId: number, cardDto: CardDto) {
    return this.prisma.card.create({
      data: {
        userId,
        ...cardDto,
      },
    });
  }

  async findAll(userId: number) {
    return this.prisma.card.findMany({
      where: {
        userId,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.card.findUnique({
      where: {
        id,
      },
    });
  }

  async remove(userId: number, id: number) {
    return this.prisma.card.delete({
      where: {
        userId,
        id,
      },
    });
  }

  async findByTitle(userId: number, title: string) {
    return this.prisma.card.findFirst({
      where: {
        userId,
        title,
      },
    });
  }

}
