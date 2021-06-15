import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import UserEntity from '../../entities/user.entity';

@Injectable()
export default class AuthenticationService {
	constructor(private readonly jwt_service: JwtService) {}

	generateNewToken(payload: object): string {
		return this.jwt_service.sign(payload);
	}

	async check(
		user: UserEntity,
		password: string,
		options: object = {},
	): Promise<boolean> {
		for (const key of Object.keys(options)) {
			if (user[key] !== options[key]) {
				return false;
			}
		}

		return await bcrypt.compare(password, user.password);
	}
}
