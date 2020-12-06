import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { authCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private AuthService: AuthService
  ) { }

  @Post('/signup')
  @UsePipes(ValidationPipe)
  async signUp(@Body() authCredentials: authCredentialsDto): Promise<void> {
    return this.AuthService.signUp(authCredentials);
  }
}
