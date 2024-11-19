import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import {  BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { GetUserParamsDto } from 'src/common/dto/pagination.dto';
import { FindUserByKeysDto } from './dto/find-user-by-keys.dto';


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

  async getListUser(params : GetUserParamsDto){
    
    const limit = parseInt(params.limit) || 1;
    const page = parseInt(params.page) || 10;
    const sortBy = params.sortBy || 'createdAt';
    const order = params.order === 'asc'? 1 : -1 ;

    const total = await this.userModel.countDocuments();
    const totalPage = Math.floor(total / limit) + 1;
    
    const skip  = limit * (page-1);
    //const user = await this.userModel.
    const users = await this.userModel
    .find()
    .sort({[sortBy] : order})
    .skip(skip)
    .limit(limit)
    .select("_id username email address role updateAt")

    return {
      total : total,
      limit : limit , 
      page : page,
      sortBy : sortBy,
      order : order,
      totalPage : totalPage,
      users : users
    }
  }

  async findUserByKeys(keys : string){

  const regex = new RegExp(keys, 'i'); 
  console.log(keys)

  const users = await this.userModel.find({
    $or: [
      { username: { $regex: regex } },  
      { address: { $regex: regex } },
      { email: { $regex: regex } },
    ],
  });
    return users
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
