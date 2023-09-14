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
import { CredentialsService } from './credentials.service';
import { AuthGuard, UserBody } from 'src/auth/guards/auth.guard';
import { User } from 'src/auth/decorators/user.decorator';
import { CredentialDto } from './dto/credential.dto';
import { ParseParamPipe } from 'src/utils/pipes/param.pipe';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  } from '@nestjs/swagger';
  
  @UseGuards(AuthGuard)
  @ApiTags('Credentials')
  @Controller('credentials')
  export class CredentialsController {
    constructor(private readonly credentialsService: CredentialsService) {}
    @Post()
    @ApiOperation({ summary: 'Creates a new credential' })
    @ApiResponse({
      status: HttpStatus.CREATED,
      description: 'Credential created',
    })
    @ApiBearerAuth()
    create(
      @User() user: UserBody,
      @Body() credentialDto: CredentialDto) {
      return this.credentialsService.create(user.id, credentialDto);
    }
  
    @Get()
    @ApiOperation({ summary: 'Returns all credentials' })
    @ApiResponse({
      status: HttpStatus.OK,
      description: 'Credentials[]',
    })
    @ApiBearerAuth()
    findAll(@User() user: UserBody) {
      return this.credentialsService.findAll(user.id);
    }
  
    @Get(':id')
    @ApiResponse({
      status: HttpStatus.OK,
      description: 'returns a single credential',
    })
    @ApiOperation({ summary: 'Returns a single credential' })
    @ApiBearerAuth()
    findOne(
      @User() user:UserBody,
      @Param('id', new ParseParamPipe) id: number) {
      return this.credentialsService.findOne(user.id, id);
    }
    
    @Delete(':id')
    @ApiResponse({
      status: HttpStatus.OK,
      description: 'deletes a single credential',
    })
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Deletes a single credential' })
    remove(
      @User() user:UserBody,
      @Param('id', new ParseParamPipe) id: number) {
      return this.credentialsService.remove(user.id, id);
    }
  }