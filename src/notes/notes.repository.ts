import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/utils/prisma/prisma.service';
import { NoteDto } from './dto/note.dto';

@Injectable()
export class NotesRepository {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, noteDto: NoteDto) {
    return await this.prisma.note.create({
      data: {
        userId,
        ...noteDto,
      },
    });
  }

  async findAll(userId: number) {
    return await this.prisma.note.findMany({
      where: {
        userId,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.note.findUnique({
      where: {
        id,
      },
    });
  }

  async remove(userId: number, id: number) {
    return await this.prisma.note.delete({
      where: {
        id,
        userId,
      },
    });
  }

  async findByTitle(userId: number, title: string) {
    return await this.prisma.note.findFirst({
      where: {
        userId,
        title,
      },
    });
  }

}
