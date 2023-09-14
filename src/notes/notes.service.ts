import { NotesRepository } from './notes.repository';
import { NoteDto } from './dto/note.dto';
import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class NotesService {
  constructor(private readonly notesRepository: NotesRepository) {}

  async create(userId: number, noteDto: NoteDto) {
    const checkbytitle = await this.notesRepository.findByTitle(
      userId,
      noteDto.title,
    );
    if (checkbytitle) throw new ConflictException('Note already exists');

    return await this.notesRepository.create(userId, noteDto);
  }

  async findAll(userId: number) {
    return await this.notesRepository.findAll(userId);
  }

  async findOne(userId: number, id: number) {
    const usercheck = await this.notesRepository.findOne(id);

    if (!usercheck) throw new NotFoundException();

    if (usercheck.userId !== userId) throw new ForbiddenException();

    return usercheck;
  }

  async remove(userId: number, id: number) {
    const usercheck = await this.notesRepository.findOne(id);
    if (!usercheck) throw new NotFoundException();

    if (usercheck.userId !== userId) throw new ForbiddenException();

    return this.notesRepository.remove(userId, id);
  }
}
