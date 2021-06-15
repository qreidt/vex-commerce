import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration';
import * as joi from '@hapi/joi';
import AppConfigService from './config.service';

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [configuration],
			validationSchema: joi.object({
				NAME: joi.string().default('Commerce APP'),
				PORT: joi.number().default(8000),
				ENV: joi
					.string()
					.valid('development', 'production', 'test')
					.default('production'),
			}),
		}),
	],
	providers: [ConfigService, AppConfigService],
	exports: [AppConfigService],
})
export default class AppConfigModule {}
