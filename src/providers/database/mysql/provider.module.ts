import { DatabaseType } from 'typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import DatabaseConfigModule from '../../../config/database/config.module';
import DatabaseConfigService from '../../../config/database/config.service';
import UserEntity from '../../../entities/user.entity';
@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			imports: [DatabaseConfigModule],
			useFactory: async (mysqlConfigService: DatabaseConfigService) => ({
				type: mysqlConfigService.CLIENT as DatabaseType,
				host: mysqlConfigService.HOST,
				port: mysqlConfigService.PORT,
				username: mysqlConfigService.USER,
				password: mysqlConfigService.PASS,
				database: mysqlConfigService.DATABASE,
				entities: [UserEntity],
				logging: mysqlConfigService.LOGGING,
				syncronize: false,
				dropSchema: false,
				migrationsRun: false,
			}),
			inject: [DatabaseConfigService],
		} as TypeOrmModuleAsyncOptions),
	],
})
export default class MySQLDatabaseProviderModule {}
