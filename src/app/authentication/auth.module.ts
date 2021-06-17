import { Module } from '@nestjs/common';
import AuthenticationController from './auth.controller';
import AuthenticationService from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import AuthenticationStrategy from './auth.strategy';
import UserEntity from '../../entities/user.entity';
import AppConfigModule from '../../config/config.module';
import AppConfigService from '../../config/config.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([UserEntity]),
		JwtModule.registerAsync({
			imports: [AppConfigModule],
			inject: [AppConfigService],
			useFactory: async (app_config: AppConfigService) => ({
				secret: app_config.key,
				signOptions: { expiresIn: '2h' },
			}),
		}),
	],
	providers: [AuthenticationService, AuthenticationStrategy],
	controllers: [AuthenticationController],
})
export default class AuthenticationModule {}
