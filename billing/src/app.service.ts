import { Inject, Injectable } from '@nestjs/common';
import { OrderCreatedEvent } from './order-created.event';
import { ClientKafka } from '@nestjs/microservices';
import { GetUserRequest } from './get-user-request.dto';

@Injectable()
export class AppService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  handleOrderCreated(orderEvent: OrderCreatedEvent) {
    this.authClient
      .send('get_user', new GetUserRequest(orderEvent.userId))
      .subscribe((user) => {
        console.log(
          `Billing user with STRIPE ID ${user.stripeUserId} for order ${orderEvent.orderId} at price ${orderEvent.price}`,
        );
      });
  }
}
