import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { SignInDto } from './signIn.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: SignInDto) {
    const { username, password } = user;
    const validatedUser = await this.validateUser(username, password);
    if (!validatedUser) {
      return { success: false, data: { error: 'Invalid credentials' } };
    }
    const payload = { username: user.username, sub: validatedUser.id };
    return {
      success: true,
      data: {
        accessToken: this.jwtService.sign(payload),
      },
    };
  }
}
