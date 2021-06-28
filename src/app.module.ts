import { Module } from '@nestjs/common';
import AppController from './app.controller';
import UsersModule from './app/users/users.module';
import AppConfigModule from './config/config.module';
import SeederModule from './db/seeders/seeder.module';
import ProductsModule from './app/products/products.module';
import ProductVariantsModule from './app/products/variants/ProductVariants.module';
import CategoriesModule from './app/categories/categories.module';
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
		ProductVariantsModule,
		CategoriesModule,
	],
	controllers: [AppController],
})
export class AppModule {}
