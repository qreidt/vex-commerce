import { Module } from '@nestjs/common';
import AppController from './app.controller';
import UsersModule from './app/users/users.module';
import AppConfigModule from './config/config.module';
import SeederModule from './db/seeders/seeder.module';
import ProductsModule from './app/products/products.module';
import VariantsModule from './app/variants/variants.module';
import AuthenticationModule from './app/authentication/auth.module';
import MySQLDatabaseProviderModule from './providers/db/mysql/provider.module';

@Module({
	imports: [
		AppConfigModule,
		MySQLDatabaseProviderModule,
		SeederModule,
		AuthenticationModule,
		UsersModule,
		ProductsModule,
		VariantsModule,
	],
	controllers: [AppController],
})
export class AppModule {}
