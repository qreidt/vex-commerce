import {
	Controller,
	Get,
	Param,
} from '@nestjs/common';
import { ClientsService } from './clients.service';

@Controller('/clients')
export class ClientsController {
	constructor(private readonly clients_service: ClientsService) {}

	@Get('/')
	index() {
		return this.clients_service.list();
	}

	@Get('/:id')
	async show(@Param('id') id: string) {
		return (await this.clients_service.findOne(+id)).toJSON();
	}
}
