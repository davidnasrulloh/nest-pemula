import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { hash } from 'bcrypt'

@Injectable()
export class UserService {

  constructor(private prisma: PrismaService){}

  async register(dto: CreateUserDto) {
    const userFindByEmail = await this.findByEmail(dto.email)

    if(userFindByEmail){
      throw new ConflictException('Email duplicate')
    }
    
    const newUser = await this.prisma.user.create({
      data: {
        ...dto,
        password: await hash(dto.password, 10)
      }
    })

    const { password, ...user } = newUser
    return user;
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  async findByEmail(email: string){
    const emailNow = email
    const userByEmail = await this.prisma.user.findUnique({
      where: {
        email: emailNow
      }
    });

    if(userByEmail){
      const { password, ...user } = userByEmail
      return user
    }

    return null
  }

  async handleLogin(email: string){
    const emailNow = email
    const userByEmail = await this.prisma.user.findUnique({
      where: {
        email: emailNow
      }
    });
    // console.log(userByEmail)
    return userByEmail
  }

  async findById(id: number | string) {
    const idNow = Number(id)
    const userById = await this.prisma.user.findUnique({
      where: {
        id: idNow
      }
    });

    const { password, ...user } = userById
    if(user){
      return user
    } 

    throw new NotFoundException('Data tidak ditemukan !')
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
