import { Injectable } from '@nestjs/common';
import { MOCK_USERS } from './users.mock';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users: User[] = MOCK_USERS;
  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
