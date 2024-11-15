import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import {  BadRequestException, InternalServerErrorException } from '@nestjs/common';


@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}


  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    try {
      const findUser = await this.userModel.findOne({ email: createUserDto.email });
      if (findUser) {
        throw new BadRequestException('Email already exists');
      }
      const newUser = await this.userModel.create(createUserDto);
      return newUser;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(`User creation failed: ${error.message}`);
    }
  }

  async findAll() {
    try {
      const findUser = await this.userModel.find({});

      return {
        message : "Find list user Success",
        users : findUser
      }
    
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(`User creation failed: ${error.message}`);
    }
  }

  async findOne(id: string) {
    try {
      const findUser = await this.userModel.findById(id);
      if(!findUser){
        throw new BadRequestException('User already exists');
        
      }
      return {
        message : "Find User Success",
        user : findUser
      }
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(`User find failed: ${error.message}`);
    }
  }

  async findByEmail(email: string) {
    try {
      const findUser = await this.userModel.findOne({email : email});
      if(!findUser){
        throw new BadRequestException('User already exists');
        
      }
      return findUser

    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(`User find failed: ${error.message}`);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const findUser = await this.userModel.findById(id);
      if(!findUser){
        throw new BadRequestException('User already exists');
        
      }
      const updateUser = await this.userModel.findByIdAndUpdate(id , updateUserDto )
      
      return {
        message : "Update User success",
        User : updateUser
      }
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(`User find failed: ${error.message}`);
    }
  }

  async remove(id: string) {
    try {
      const findUser = await this.userModel.findById(id);
      if(!findUser){
        throw new BadRequestException('User not exists');
        
      }
      const updateUser = await this.userModel.findByIdAndDelete(id)
      
      return {
        message : "Delete User success",
      }
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(`User find failed: ${error.message}`);
    }
  }

}
