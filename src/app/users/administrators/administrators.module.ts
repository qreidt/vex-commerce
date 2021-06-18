import { Module } from '@nestjs/common';
import { AdministratorsService } from './administrators.service';
import { AdministratorsController } from './administrators.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserEntity from '../../../entities/user/user.entity';

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity])],
	controllers: [AdministratorsController],
	providers: [AdministratorsService],
})
export class AdministratorsModule {}
