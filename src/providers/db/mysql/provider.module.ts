import { DatabaseType } from 'typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import AppConfigService from '../../../config/config.service';
import UserEntity from '../../../entities/user.entity';
import AppConfigModule from '../../../config/config.module';

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			imports: [AppConfigModule],
			useFactory: async (app_config: AppConfigService) => ({
				type: app_config.db_client as DatabaseType,
				host: app_config.db_host,
				port: app_config.db_port,
				username: app_config.db_user,
				password: app_config.db_pass,
				database: app_config.db_database,
				logging: app_config.db_logging,
				entities: [UserEntity],
				syncronize: false,
				dropSchema: false,
				migrationsRun: false,
			}),
			inject: [AppConfigService],
		} as TypeOrmModuleAsyncOptions),
	],
})
export default class MySQLDatabaseProviderModule {}
