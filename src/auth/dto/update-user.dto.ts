import { PartialType } from '@nestjs/mapped-types';
import { SignUp } from './signup.dto';
import { IsOptional, IsString, IsNumber, IsEmail, IsEnum } from 'class-validator';

export class UpdateUserDto extends PartialType(SignUp) {
  
    @IsOptional()
    @IsString()
    nomUser?: string;
  
    @IsOptional()
    @IsString()
    prenomUser?: string;
  
    @IsOptional()
    @IsNumber()
    telUser?: number;
  
    @IsOptional()
    @IsEmail()
    emailUser?: string;
  
    @IsOptional()
    @IsEnum(['-1', '0', '1'])
    statusUser?: string;
  
    @IsOptional()
    createUserAt?: number;
  
    @IsOptional()
    updateUserAt?: number;
}
