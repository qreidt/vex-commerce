import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthStrategy } from './auth.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';

@Module({
	imports: [
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
	providers: [AuthService, AuthStrategy],
	controllers: [AuthController],
})
export class AuthModule {}
