import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import UserEntity from '../../entities/user/user.entity';
import RegisterDto from './dtos/register.dto';

@Injectable()
export default class AuthenticationService {
	constructor(
		@InjectRepository(UserEntity)
		readonly user_repository: Repository<UserEntity>,
		private readonly jwt_service: JwtService,
	) {}

	generateNewToken(payload: object): string {
		return this.jwt_service.sign(payload);
	}

	async check(user: UserEntity, password: string, options: object = {}): Promise<boolean> {
		for (const key of Object.keys(options)) {
			if (user[key] !== options[key]) {
				return false;
			}
		}

		return await bcrypt.compare(password, user.password);
	}

	async createClient(data: RegisterDto): Promise<UserEntity> {
		const email_exists = await this.user_repository.findOne({
			email: data.email,
		});

		if (email_exists) {
			throw new BadRequestException({
				status: 400,
				errors: ['Email is Already in Use'],
				error: 'Bad Request',
			});
		}

		const user = this.user_repository.merge(new UserEntity(), {
			...data,
			type: UserEntity.TYPES.client,
		});

		user.password = await UserEntity.hashPassword(user.password);

		return await this.user_repository.save(user);
	}
}
