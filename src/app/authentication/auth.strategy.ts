import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import AppConfigService from '../../config/config.service';

@Injectable()
export default class AuthenticationStrategy extends PassportStrategy(Strategy) {
	constructor(private app_config: AppConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: true,
			secretOrKey: app_config.key,
		});
	}

	async validate(payload: any) {
		return { user_id: payload.id };
	}
}
