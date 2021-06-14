import {
	Body,
	Controller,
	HttpCode,
	Post,
	UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { LoginDto } from './dtos/login.dto';

@Controller('/auth')
export class AuthController {
	constructor(
		@InjectRepository(UserEntity)
		readonly user_repository: Repository<UserEntity>,
		private auth_service: AuthService,
	) {}

	@Post('/register')
	@HttpCode(200)
	async register(@Body() body: RegisterDto) {
		let user = this.user_repository.merge(new UserEntity(), {
			...body,
			type: UserEntity.TYPES.client,
		});

		user.password = await UserEntity.hashPassword(user.password);

		user = await this.user_repository.save(user);

		return user.toJSON();
	}

	@Post('/login')
	@HttpCode(200)
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

		return { user: user.toJSON(), token };
	}
}
