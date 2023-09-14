import { IsNotEmpty } from 'class-validator';

export class CredentialDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  url: string;
  
  @IsNotEmpty()
  username: string;
  
  @IsNotEmpty()
  password: string;
}