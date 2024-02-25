import { Injectable } from '@nestjs/common';
import { GetUserRequest } from './get-user-request.dto';

@Injectable()
export class AppService {
  private readonly users = [
    {
      userId: '1234',
      stripeUserId: 'abcd1234',
    },
    {
      userId: '5678',
      stripeUserId: 'efgh5678',
    },
    {
      userId: '9012',
      stripeUserId: 'ijkl9012',
    },
  ];
  getHello(): string {
    return 'Hello World!';
  }

  getUser(userRequest: GetUserRequest) {
    return this.users.find((user) => user.userId === userRequest.userId);
  }
}
