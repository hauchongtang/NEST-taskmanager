import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private AuthService: AuthService
  ) { }

  @Post('/signup')
  async signUp(@Body(ValidationPipe) authCredentials: AuthCredentialsDto): Promise<void> {
    return this.AuthService.signUp(authCredentials);
  }

  @Post('/signin')
  async signIn(@Body(ValidationPipe) authCredentials: AuthCredentialsDto): Promise<void> {
    return this.AuthService.signIn(authCredentials);
  }
}
