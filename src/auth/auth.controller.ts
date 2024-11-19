import { Body, Controller, Post, HttpCode, HttpStatus ,UseGuards, Get ,Request} from '@nestjs/common';
import { AuthService } from './auth.service';
import {JwtAuthGuard} from './auth.guard';
import { JwtStrategy } from './jwt.strategy';
import { Roles } from './roles.decorator';
import { Role } from './role.enum';
import { RolesGuard } from './roles.guard';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
  
  
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.User)
  @Get('profile')
  getProfile(@Request() req) {
    return  this.authService.getProfileUser(req.user.id)
    //return req.user;
    
  }

}