import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as joi from '@hapi/joi';
import { app, database } from './configuration';
import AppConfigService from './config.service';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [app, database],
			validationSchema: joi.object({
				name: joi.string().default('Commerce APP'),
				port: joi.number().default(8000),
				key: joi.string(),
				env: joi
					.string()
					.valid('development', 'production', 'test')
					.default('production'),
				db_client: joi.string().default('mariadb'),
				db_host: joi.string().default('127.0.0.1'),
				db_port: joi.number().default(3306),
				db_user: joi.string().default('root'),
				db_pass: joi.string().default(''),
				db_database: joi.string().default('commerce'),
				db_logging: joi.boolean().default(false),
				db_syncronize: joi.boolean().default(false),
				db_dropSchema: joi.boolean().default(false),
			}),
		}),
	],
	providers: [ConfigService, AppConfigService],
	exports: [AppConfigService],
})
export default class AppConfigModule {}
