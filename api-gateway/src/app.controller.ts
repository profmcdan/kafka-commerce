import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateOrderRequest } from './create-order-request.dt';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/order')
  createOrder(@Body() order: CreateOrderRequest) {
    return this.appService.createOrder(order);
  }
}
