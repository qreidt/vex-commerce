import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	Patch,
} from '@nestjs/common';
import { AdministratorsService } from './administrators.service';
import { CreateAdministratorDto } from './dto/create-administrator.dto';
import { UpdateAdministratorDto } from './dto/update-administrator.dto';

@Controller('/administrators')
export class AdministratorsController {
	constructor(
		private readonly administrators_service: AdministratorsService,
	) {}

	@Get('/')
	index() {
		return this.administrators_service.list();
	}

	@Post('/')
	create(@Body() data: CreateAdministratorDto) {
		return this.administrators_service.create(data);
	}

	@Get('/:id')
	async show(@Param('id') id: number) {
		return (await this.administrators_service.findOne(+id)).toJSON();
	}

	@Patch('/:id')
	update(@Param('id') id: number, @Body() data: UpdateAdministratorDto) {
		return this.administrators_service.update(+id, data);
	}

	@Delete('/:id')
	remove(@Param('id') id: number) {
		return this.administrators_service.remove(+id);
	}
}
