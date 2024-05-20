import { Injectable,UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity'
import { SignUp } from './dto/signup.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './jwt-constant';
import { Request } from 'express';
import generateUniqueUserID from './generateUniqueUserID';
import * as bcrypt from 'bcryptjs'



@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    private readonly jwtService: JwtService, // Injectez JwtService
  ) {}

  async singUp(userDto: SignUp): Promise<{ user: Users; token: string }> {
    userDto.profilUser = "1";
    const hashedPassword = await bcrypt.hash(userDto.password, 10)
    userDto.password = hashedPassword
    console.log(userDto);
    
    const newUser = await this.userRepository.create(userDto);
    const savedUser = await this.userRepository.save(newUser);
    
    
    const payload = { sub: savedUser.id, emailUser: savedUser.emailUser };
    const token = await this.jwtService.signAsync(payload)
    console.log(payload);
    console.log(token);

    return { user: savedUser, token };
  }

  async login(user: SignUp) : Promise<{ user : Users; token: string} | any> {
    const {nomUser, password, emailUser} = user
    const trueUser = await this.userRepository.findOne({where : {emailUser}})

    if(!trueUser){
      return{
        status: false,
        msg :'aucun utilisateur correspondant'
      }
    }
    const IsPasswordMatced = await bcrypt.compare(password, trueUser.password)
    if (!IsPasswordMatced) {
      return {
        success : false,
        msg: "password incorrect"
      }
    }
    if(!trueUser){
      throw new Error('this user dos*nt existe')
    }
    const payload = { sub: trueUser.id, emailUser: trueUser.emailUser }; 
    const token = await this.jwtService.signAsync(payload)
    return { user:trueUser , token: token }
  }

  async findAll(): Promise<Users[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<Users | undefined> {
    if (!id) {
      throw new Error('ID is required'); // Gérer le cas où aucun ID n'est fourni
    }
    return await this.userRepository.findOne({where:{id}});
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async validateUser(token: string) : Promise<any>{
      console.log(token);
      try {
        const payload = await this.jwtService.verifyAsync(token, {
          secret: jwtConstants.secret,
        });
        const user = await this.userRepository.findOne({ where: payload.sub})
        console.log(payload);
        if (!user) {
          return {
            status: false,
            msg: "cette utilisateur n'existe pas "
          }
        } else {
          console.log("utilisateur ici", user);
          return {
            status: true,
            msg:'utilisateur en regle'
          }
        }
      } catch (error) {
        console.log(error);
        throw new UnauthorizedException(error);
    } 
  }

  async CreateMembre( req:Request, mem: SignUp ): Promise<any>{
    if (!req.headers) {
      return {msq : "vous n'avez pas d'autorisation d'utiisateur"
      }
    }
    if (!req.headers.authorization) {
      return {msq : "vous n'avez pas d'autorisation"
      }
    }
    console.log('ici',mem);
    const id =  await this.extractUserFromHeader(req)
    if (!id) {
      return {
        msg: "vous n'avez pas d'autorisation"
      }
    }
    const usersAd = await this.userRepository.findOne({where : {id}})
    console.log('utilisateur : ',usersAd);
    if (usersAd.profilUser !== "3") {
      return {
        msg: "vous n'avez pas cette autorisation sur un compte non administrateur"
      }
    } 
    mem.profilUser = "2";
    mem.createUserAt = id;
    mem.matMemb = generateUniqueUserID();
    // console.log("nouceau : ", mem);
    
    // console.log("matric", mem.matMemb);
    const newUser = await this.userRepository.create(mem);
    const savedUser = await this.userRepository.save(newUser);
    return {
      succes: true
    };
    
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
  private async extractUserFromHeader(req : Request): Promise<number | undefined>  {
    if (!req.headers.authorization) {
      return undefined
    }
    console.log(req.headers);
    
    const token = this.extractTokenFromHeader(req);
    if (!token) {
      return undefined
    }

    try{
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      console.log(payload);
      return payload.sub
    } catch (error){
      return undefined
    }
  }

}
