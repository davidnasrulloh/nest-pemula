import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() dto: CreateUserDto,@Res() res: Response) {
    try {
      const newUser = await this.userService.register(dto);
      return res.status(200).json({
        success: true,
        message: "Register berhasil !",
        data: newUser
      }) 
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Register gagal !",
        error: error?.response
      })
    }
  }
  
  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string | number, @Res() res: Response) {
    try {
      const getData = await this.userService.findById(+id)
      return res.status(200).json({
        success: true,
        data: getData
      })
    } catch (error) {
      return res.status(400).json({
        success: false,
        messafe: "data tidak ditemukan",
        error: error
      })
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
