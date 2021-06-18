import { Module } from '@nestjs/common';
import UserSeederModule from './users/user.module';
import SeederService from './seeder.service';

@Module({
	imports: [UserSeederModule],
	providers: [SeederService],
	exports: [SeederService],
})
export default class SeederModule {}
