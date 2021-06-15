import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class AppConfigService {
	constructor(private config_service: ConfigService) {}

	get NAME(): string {
		return this.config_service.get<string>('app.name');
	}

	get ENV(): string {
		return this.config_service.get<string>('app.env');
	}

	get PORT(): number {
		return parseInt(this.config_service.get<string>('app.port'));
	}
}
