import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from '@/modules/auth/2-application/services/auth.service';
import { RegisterDto } from '@/modules/auth/1-presentation/dtos/register.dto';
import { LoginDto } from '@/modules/auth/1-presentation/dtos/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '@/modules/auth/1-presentation/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
