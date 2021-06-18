import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserEntity from '../../../entities/user/user.entity';

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity])],
	controllers: [ClientsController],
	providers: [ClientsService],
})
export class ClientsModule {}