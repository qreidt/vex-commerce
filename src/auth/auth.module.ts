import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthStrategy } from './auth.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/User';

@Module({
	controllers: [AuthController],
	providers: [AuthService, AuthStrategy],
	imports: [
		TypeOrmModule.forFeature([User]),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (config_service: ConfigService) => ({
				secret: config_service.get('KEY'),
				signOptions: { expiresIn: '2h' },
			}),
		}),
	],
})
export class AuthModule {}
