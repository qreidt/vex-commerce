import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import AdministratorsService from './administrators.service';
import AdministratorsController from './administrators.controller';
import UserEntity from '../../../entities/user/user.entity';

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity])],
	controllers: [AdministratorsController],
	providers: [AdministratorsService],
})
export default class AdministratorsModule {}
