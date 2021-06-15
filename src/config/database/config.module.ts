import * as joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration';
import DatabaseConfigService from './config.service';

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [configuration],
			validationSchema: joi.object({
				CLIENT: joi.string().default('mariadb'),
				HOST: joi.string().default('127.0.0.1'),
				PORT: joi.number().default(3306),
				USER: joi.string().default('root'),
				PASS: joi.string().default(''),
				DATABASE: joi.string().default('commerce'),
				LOGGING: joi.boolean().default(false),
			}),
		}),
	],
	providers: [ConfigService, DatabaseConfigService],
	exports: [ConfigService, DatabaseConfigService],
})
export default class DatabaseConfigModule {}
