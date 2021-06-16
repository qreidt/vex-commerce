import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class AppConfigService {
	constructor(private config_service: ConfigService) {}

	get name(): string {
		return this.config_service.get<string>('app.name');
	}

	get env(): string {
		return this.config_service.get<string>('app.env');
	}

	get port(): number {
		return parseInt(this.config_service.get<string>('app.port'));
	}

	get db_client(): string {
		return this.config_service.get<string>('db.sql.name');
	}

	get db_host(): string {
		return this.config_service.get<string>('db.sql.host');
	}

	get db_port(): number {
		return this.config_service.get<number>('db.sql.port');
	}

	get db_user(): string {
		return this.config_service.get<string>('db.sql.user');
	}

	get db_pass(): string {
		return this.config_service.get<string>('db.sql.pass');
	}

	get db_database(): string {
		return this.config_service.get<string>('db.sql.db');
	}

	get db_logging(): boolean {
		return this.config_service.get<boolean>('db.sql.logging');
	}
}
