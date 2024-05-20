// create-user.dto.ts
import { IsNotEmpty, IsOptional, IsString, IsNumber, IsEmail, IsEnum, } from 'class-validator';


export class SignUp {
  @IsOptional()
  @IsString()
  matMemb: string;

  @IsNotEmpty()
  @IsString()
  nomUser: string;

  @IsOptional()
  @IsString()
  prenomUser?: string;

  @IsOptional()
  @IsNumber()
  telUser?: number;

  @IsNotEmpty()
  @IsEmail()
  emailUser?: string;

  @IsNotEmpty()
  @IsString()
  password?: string;

  @IsOptional()
  @IsEnum(['1', '2', '3'])
  profilUser?: string;

  @IsOptional()
  @IsEnum(['-1', '0', '1'])
  statusUser: string;

  @IsOptional()
  createUserAt?: number;

  @IsOptional()
  updateUserAt?: number;
}


