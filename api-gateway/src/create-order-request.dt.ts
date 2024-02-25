import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderRequest {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  price: number;
}
