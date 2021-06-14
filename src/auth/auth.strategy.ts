import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../entities/User';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
	constructor(private auth_service: AuthService) {
		super();
	}

	async validate(access_token: string, refresh_token: string, user: User) {}
}
