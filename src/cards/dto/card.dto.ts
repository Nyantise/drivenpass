import { CardType } from '@prisma/client';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class CardDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  number: string;
  
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  cvv: string;

  @IsNotEmpty()
  exp: string;

  @IsNotEmpty()
  @IsEnum(CardType)
  type: CardType;

}