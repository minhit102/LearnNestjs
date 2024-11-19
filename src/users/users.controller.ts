import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { GetUserParamsDto } from 'src/common/dto/pagination.dto';
import { FindUserByKeysDto } from './dto/find-user-by-keys.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  findAll() {
    return this.usersService.findAll();
  }

  @Get('list-user')
  getListUser(@Query() params : GetUserParamsDto){
    return this.usersService.getListUser(params)
  }
  @Get('search')
  getUserByKeys(@Query('keys') keys : string ){
    return this.usersService.findUserByKeys(keys)
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
  // Phân trang 
}
