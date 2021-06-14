import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	Patch,
	UseGuards,
} from '@nestjs/common';
import { AdministratorsService } from './administrators.service';
import { CreateAdministratorDto } from './dto/create-administrator.dto';
import { UpdateAdministratorDto } from './dto/update-administrator.dto';
import { LocalAuthGuard } from '../../auth/auth.guard';

@Controller('/administrators')
export class AdministratorsController {
	constructor(
		private readonly administrators_service: AdministratorsService,
	) {}

	@UseGuards(LocalAuthGuard)
	@Get('/')
	index() {
		return this.administrators_service.list();
	}

	@UseGuards(LocalAuthGuard)
	@Post('/')
	create(@Body() data: CreateAdministratorDto) {
		return this.administrators_service.create(data);
	}

	@UseGuards(LocalAuthGuard)
	@Get('/:id')
	async show(@Param('id') id: number) {
		return (await this.administrators_service.findOne(+id)).toJSON();
	}

	@UseGuards(LocalAuthGuard)
	@Patch('/:id')
	update(@Param('id') id: number, @Body() data: UpdateAdministratorDto) {
		return this.administrators_service.update(+id, data);
	}

	@UseGuards(LocalAuthGuard)
	@Delete('/:id')
	remove(@Param('id') id: number) {
		return this.administrators_service.remove(+id);
	}
}
