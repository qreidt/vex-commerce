import { Module } from '@nestjs/common';
import AppController from './app.controller';
import MySQLDatabaseProviderModule from './providers/database/mysql/provider.module';
import AppConfigModule from './config/app/config.module';
import DatabaseConfigModule from './config/database/config.module';
import AuthenticationModule from './app/authentication/auth.module';
import UsersModule from './app/users/users.module';

@Module({
	imports: [
		AppConfigModule,
		DatabaseConfigModule,
		MySQLDatabaseProviderModule,
		AuthenticationModule,
		UsersModule,
	],
	controllers: [AppController],
})
export class AppModule {}
