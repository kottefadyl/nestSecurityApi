import { Req,Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { SignUp } from './dto/signup.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {Request} from 'express'

@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  create(@Body() createUserDto: SignUp) {
    console.log(createUserDto);
    return this.authService.singUp(createUserDto);
  }

  @Post('createMem')
  createmem(
    @Body() mem: SignUp,
   @Req()req : Request
   
  ) {
     return this.authService.CreateMembre(req, mem);
  }

  @Post('validation')
  valid(@Body() token: any){
    console.log(token);
    return this.authService.validateUser(token.token);
  }

  @Post('login')
  login(@Body() loginUser:SignUp ){
    return this.authService.login(loginUser)
  }

  // @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.authService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
