import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
	imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot(), AuthModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
