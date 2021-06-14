import {
	Controller,
	Get,
	Param, UseGuards,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { LocalAuthGuard } from '../../auth/auth.guard';

@Controller('/clients')
export class ClientsController {
	constructor(private readonly clients_service: ClientsService) {}

	@UseGuards(LocalAuthGuard)
	@Get('/')
	index() {
		return this.clients_service.list();
	}

	@UseGuards(LocalAuthGuard)
	@Get('/:id')
	async show(@Param('id') id: string) {
		return (await this.clients_service.findOne(+id)).toJSON();
	}
}
