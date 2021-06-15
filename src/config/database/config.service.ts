import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class DatabaseConfigService {
	constructor(private config_service: ConfigService) {}

	get CLIENT(): string {
		return this.config_service.get<string>('database.mysql.name');
	}

	get HOST(): string {
		return this.config_service.get<string>('database.mysql.host');
	}

	get PORT(): number {
		return this.config_service.get<number>('database.mysql.port');
	}

	get USER(): string {
		return this.config_service.get<string>('database.mysql.user');
	}

	get PASS(): string {
		return this.config_service.get<string>('database.mysql.pass');
	}

	get DATABASE(): string {
		return this.config_service.get<string>('database.mysql.database');
	}

	get LOGGING(): boolean {
		return this.config_service.get<boolean>('database.mysql.logging');
	}
}
