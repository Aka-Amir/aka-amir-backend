import * as dto from './DTO';
import { TicketsService } from './tickets.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('tickets')
export class TicketsController {
  constructor(private service: TicketsService) {}

  @Post('open')
  private async OpenTicket(@Body() body: dto.OpenTicketDto) {
    const result = await this.service.Create(body.email, body.problem);
    return {
      message: 'created',
      payload: result,
    };
  }
}
