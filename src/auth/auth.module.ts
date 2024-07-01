import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { jwtConstants } from './jwt-constant';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports:[
    TypeOrmModule.forFeature([Users]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '2880m' },
    }),
  ],
  controllers: [ AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}