import { IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class EraseDto {
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
