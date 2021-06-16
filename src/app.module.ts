import { Module } from '@nestjs/common';
import AppController from './app.controller';
import MySQLDatabaseProviderModule from './providers/db/mysql/provider.module';
import AppConfigModule from './config/config.module';
import AuthenticationModule from './app/authentication/auth.module';
import UsersModule from './app/users/users.module';

@Module({
	imports: [
		AppConfigModule,
		MySQLDatabaseProviderModule,
		AuthenticationModule,
		UsersModule,
	],
	controllers: [AppController],
})
export class AppModule {}
