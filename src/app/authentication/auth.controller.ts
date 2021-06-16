import {
	Body,
	ClassSerializerInterceptor,
	Controller,
	HttpCode,
	Post,
	UnauthorizedException,
	UseInterceptors,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import AuthenticationService from './auth.service';
import RegisterDto from './dtos/register.dto';
import UserEntity from '../../entities/user.entity';
import LoginDto from './dtos/login.dto';

@Controller('/auth')
export default class AuthenticationController {
	constructor(
		@InjectRepository(UserEntity)
		readonly user_repository: Repository<UserEntity>,
		private auth_service: AuthenticationService,
	) {}

	@Post('/register')
	@HttpCode(200)
	@UseInterceptors(ClassSerializerInterceptor)
	async register(@Body() data: RegisterDto) {
		const user = this.user_repository.merge(new UserEntity(), {
			...data,
			type: UserEntity.TYPES.client,
		});

		user.password = await UserEntity.hashPassword(user.password);

		return await this.user_repository.save(user);
	}

	@Post('/login')
	@HttpCode(200)
	@UseInterceptors(ClassSerializerInterceptor)
	async login(@Body() credentials: LoginDto) {
		const user = await this.user_repository.findOne({
			email: credentials.email,
		});

		if (!user) {
			throw new UnauthorizedException();
		}

		const is_authenticated = await this.auth_service.check(
			user,
			credentials.password,
		);

		if (!is_authenticated) {
			throw new UnauthorizedException();
		}

		const token = this.auth_service.generateNewToken({
			user_id: user.id,
		});

		delete user.password;

		return { user, token };
	}
}
