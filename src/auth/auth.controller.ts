import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/RegisterDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/User';

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
}
