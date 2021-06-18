import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	Patch,
	UseGuards,
	ClassSerializerInterceptor,
	UseInterceptors,
	HttpCode,
} from '@nestjs/common';
import { AdministratorsService } from './administrators.service';
import { CreateAdministratorDto } from './dto/create-administrator.dto';
import { UpdateAdministratorDto } from './dto/update-administrator.dto';
import { LocalAuthGuard } from '../../../common/guards/auth.guard';

@Controller('/administrators')
export class AdministratorsController {
	constructor(private readonly administrators_service: AdministratorsService) {}

	@UseGuards(LocalAuthGuard)
	@Get('/')
	@UseInterceptors(ClassSerializerInterceptor)
	@HttpCode(200)
	index() {
		return this.administrators_service.list();
	}

	@UseGuards(LocalAuthGuard)
	@Post('/')
	@UseInterceptors(ClassSerializerInterceptor)
	@HttpCode(201)
	create(@Body() data: CreateAdministratorDto) {
		return this.administrators_service.create(data);
	}

	@UseGuards(LocalAuthGuard)
	@Get('/:id')
	@UseInterceptors(ClassSerializerInterceptor)
	@HttpCode(200)
	show(@Param('id') id: number) {
		return this.administrators_service.findOne(+id);
	}

	@UseGuards(LocalAuthGuard)
	@Patch('/:id')
	@UseInterceptors(ClassSerializerInterceptor)
	@HttpCode(200)
	update(@Param('id') id: number, @Body() data: UpdateAdministratorDto) {
		return this.administrators_service.update(+id, data);
	}

	@UseGuards(LocalAuthGuard)
	@Delete('/:id')
	@UseInterceptors(ClassSerializerInterceptor)
	@HttpCode(200)
	remove(@Param('id') id: number) {
		return this.administrators_service.remove(+id);
	}
}
