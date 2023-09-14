import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { NoteDto } from './dto/note.dto';
import { AuthGuard, UserBody } from 'src/auth/guards/auth.guard';
import { User } from 'src/auth/decorators/user.decorator';
import { ParseParamPipe } from 'src/utils/pipes/param.pipe';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';


@UseGuards(AuthGuard)
@Controller('notes')
@ApiTags('Notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @ApiOperation({ summary: 'Creates a new note' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Note created',
  })
  @ApiBearerAuth()
  create(
    @User() user: UserBody,
    @Body() noteDto: NoteDto) {
    return this.notesService.create(user.id, noteDto);
  }

  @Get()
  @ApiOperation({ summary: 'Returns all notes' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'returns an array of notes',
  })
  @ApiBearerAuth()
  findAll(@User() user: UserBody) {
    return this.notesService.findAll(user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Returns a single note' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'returns a single note',
  })
  @ApiBearerAuth()
  findOne(
    @User() user: UserBody, 
    @Param('id', new ParseParamPipe) id: number) {
    return this.notesService.findOne(user.id, id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes a single note' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'deletes a single note',
  })
  @ApiBearerAuth()
  remove(
    @User() user: UserBody,
    @Param('id', new ParseParamPipe) id: number) {
    return this.notesService.remove(user.id, id);
  }
}
