import {
	ClassSerializerInterceptor,
	Controller,
	Get,
	HttpCode,
	Param,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import ClientsService from './clients.service';
import LocalAuthGuard from '../../../common/guards/auth.guard';

@Controller('/clients')
export default class ClientsController {
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
	show(@Param('id') id: number) {
		return this.clients_service.findOne(+id);
	}
}
