import { DatabaseType } from 'typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import AppConfigService from '../../../config/config.service';
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
				syncronize: app_config.db_syncronize,
				dropSchema: app_config.db_drop_schema,
				keepConnectionAlive: true,
				migrationsRun: true,
				entities: [__dirname + '/src/entities/*.entity.{ts,js}'],
				migrations: [],
			}),
			inject: [AppConfigService],
		} as TypeOrmModuleAsyncOptions),
	],
})
export default class MySQLDatabaseProviderModule {}
