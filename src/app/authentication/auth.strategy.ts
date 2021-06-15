import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import AuthenticationService from './auth.service';

@Injectable()
export default class AuthenticationStrategy extends PassportStrategy(Strategy) {
	constructor(private auth_service: AuthenticationService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: true,
			secretOrKey: process.env.KEY,
		});
	}

	async validate(payload: any) {
		return { user_id: payload.id };
	}
}
