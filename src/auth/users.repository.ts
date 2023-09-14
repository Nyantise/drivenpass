import { Injectable } from '@nestjs/common';
import { SignInUpDto } from 'src/auth/dto/sign-in-up.dto';
import { PrismaService } from 'src/utils/prisma/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) { }

  create(createUserDto: SignInUpDto) {
    return this.prisma.user.create({
      data: createUserDto
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({where: {id}});
  }

  update(id: number, updateUserDto: SignInUpDto) {
    return this.prisma.user.update({
      where: {id},
      data: updateUserDto
    });
  }

  async remove(userId: number) {
    await this.prisma.credential.deleteMany({where: {userId}});
    await this.prisma.note.deleteMany({where: {userId}});
    await this.prisma.card.deleteMany({where: {userId}});
    return await this.prisma.user.delete({where: {id: userId}});
  }

  findOneByEmail(email: string){
    return this.prisma.user.findUnique({
      where:{email}
    })
  }
}
