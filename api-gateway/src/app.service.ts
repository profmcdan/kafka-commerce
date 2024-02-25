import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderRequest } from './create-order-request.dt';
import { ClientKafka } from '@nestjs/microservices';
import { OrderCreatedEvent } from './order-created.event';
import { createId } from '@paralleldrive/cuid2';

@Injectable()
export class AppService {
  constructor(
    @Inject('BILLING_SERVICE') private readonly billingClient: ClientKafka,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  createOrder(order: CreateOrderRequest) {
    // Emit event to billing service
    const newOrderId = createId();
    this.billingClient.emit(
      'order_created',
      new OrderCreatedEvent(newOrderId, order.userId, order.price),
    );
    return { ...order, orderId: newOrderId };
  }
}
