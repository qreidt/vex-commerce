import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
	constructor(private readonly jwt_service: JwtService) {}

	generateNewToken(payload: object): string {
		return this.jwt_service.sign(payload);
	}

	async hashPassword(password: string): Promise<string> {
		return await bcrypt.hash(password, 12);
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
