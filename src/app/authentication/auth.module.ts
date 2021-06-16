import { Module } from '@nestjs/common';
import AuthenticationController from './auth.controller';
import AuthenticationService from './auth.service';
import AuthenticationStrategy from './auth.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserEntity from '../../entities/user.entity';
import MySQLDatabaseProviderModule from '../../providers/db/mysql/provider.module';

@Module({
	imports: [
		MySQLDatabaseProviderModule,
		TypeOrmModule.forFeature([UserEntity]),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (config_service: ConfigService) => ({
				secret: config_service.get('KEY'),
				signOptions: { expiresIn: '2h' },
			}),
		}),
	],
	providers: [AuthenticationService, AuthenticationStrategy],
	controllers: [AuthenticationController],
})
export default class AuthenticationModule {}
