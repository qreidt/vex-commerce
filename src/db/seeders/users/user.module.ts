import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserEntity from '../../../entities/user/user.entity';
import UserSeederService from './user.service';

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity])],
	providers: [UserSeederService],
	exports: [UserSeederService],
})
export default class UserSeederModule {}
