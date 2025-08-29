import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @UseGuards(AuthGuard)
  @Get()
  async getProfile(@Request() req: any) {
    const user = await this.usersService.findOne(req.user.username);
    return {
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    };
  }
}
