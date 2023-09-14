import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CredentialsRepository } from './credentials.repository';
import Cryptr from 'cryptr';
import { ConfigService } from '@nestjs/config';
import { CredentialDto } from './dto/credential.dto';


@Injectable()
export class CredentialsService {
  private config: ConfigService;
  private cryptr: Cryptr;

  constructor(
    configService: ConfigService,
    private credentialsRepository: CredentialsRepository,
  ) {
    const Cryptr = require('cryptr');
    this.config = configService;
    const secretKey = this.config.get<string>('CRYPTR_SECRET');
    this.cryptr = new Cryptr(secretKey);
  }

  async create(userId: number, credentialDto: CredentialDto) {
    const check = await this.credentialsRepository.findByTitle(
      userId,
      credentialDto.title,
    );
    if (check) {
      throw new ConflictException();
    }
    const cryptPassword = this.cryptr.encrypt(credentialDto.password);
    credentialDto.password = cryptPassword

    return await this.credentialsRepository.create(userId, credentialDto);
  }

  async findAll(userId: number) {
    const credentials = await this.credentialsRepository.findAll(userId);
    return credentials.map((credential) => {
      const uncryptedPassword = this.cryptr.decrypt(credential.password);
      credential.password = uncryptedPassword
      return credential;
    });
  }

  async findOne(userId: number, id: number) {
    const credential = await this.credentialsRepository.findOne(id);
    if (!credential) {
      throw new NotFoundException();
    }
    if (credential) {
      if (userId !== credential.userId) {
        throw new ForbiddenException();
      }
      const uncryptedPassword = this.cryptr.decrypt(credential.password);
      credential.password = uncryptedPassword
      return credential;
    }
    return null;
  }

  async remove(userId: number, id: number) {
    const credential = await this.credentialsRepository.findOne(id);
    if (!credential) {
      throw new NotFoundException();
    }
    if (userId !== credential.userId) {
      throw new ForbiddenException();
    }
    return await this.credentialsRepository.remove(userId, id);
  }
}
