import {
	Body,
	Controller,
	HttpCode,
	Post,
	UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/RegisterDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/User';
import { LoginDto } from './dtos/LoginDto';

@Controller('/auth')
export class AuthController {
	constructor(
		@InjectRepository(User) readonly user_repository: Repository<User>,
		private auth_service: AuthService,
	) {}

	@Post('/register')
	@HttpCode(200)
	async register(@Body() body: RegisterDto) {
		let user = this.user_repository.merge(new User(), {
			...body,
			type: User.TYPES.user,
		});

		user.password = await this.auth_service.hashPassword(user.password);

		user = await this.user_repository.save(user);

		delete user.password;

		return user;
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

		return { user, token };
	}
}
