import { ClassSerializerInterceptor, Controller, Get, HttpCode, Param, UseGuards, UseInterceptors } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { LocalAuthGuard } from '../../../common/guards/auth.guard';

@Controller('/clients')
export class ClientsController {
	constructor(private readonly clients_service: ClientsService) {}

	@UseGuards(LocalAuthGuard)
	@Get('/')
	@UseInterceptors(ClassSerializerInterceptor)
	@HttpCode(200)
	index() {
		return this.clients_service.list();
	}

	@UseGuards(LocalAuthGuard)
	@Get('/:id')
	@UseInterceptors(ClassSerializerInterceptor)
	@HttpCode(200)
	show(@Param('id') id: string) {
		return this.clients_service.findOne(+id);
	}
}
