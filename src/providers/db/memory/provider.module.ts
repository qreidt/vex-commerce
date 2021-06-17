import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import AppConfigService from '../../../config/config.service';
import AppConfigModule from '../../../config/config.module';

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			imports: [AppConfigModule],
			useFactory: async (app_config: AppConfigService) => ({
				type: 'sqlite',
				database: ':memory:',
				synchronize: true,
				dropSchema: true,
				logging: app_config.db_logging,
				entities: ['src/entities/*.entity.{ts,js}'],
				keepConnectionAlive: true,
			}),
			inject: [AppConfigService],
		} as TypeOrmModuleAsyncOptions),
	],
})
export default class MemoryDatabaseProviderModule {}
