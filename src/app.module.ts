import { Module } from '@nestjs/common';
import AppController from './app.controller';
import UsersModule from './app/users/users.module';
import AppConfigModule from './config/config.module';
import AuthenticationModule from './app/authentication/auth.module';
import MySQLDatabaseProviderModule from './providers/db/mysql/provider.module';
import SeederModule from './db/seeders/seeder.module';

@Module({
	imports: [
		AppConfigModule,
		MySQLDatabaseProviderModule,
		SeederModule,
		AuthenticationModule,
		UsersModule,
	],
	controllers: [AppController],
})
export class AppModule {}
