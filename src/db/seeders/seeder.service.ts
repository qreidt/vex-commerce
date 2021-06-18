import { Injectable } from '@nestjs/common';
import UserSeederService from './users/user.service';

@Injectable()
export default class SeederService {
	constructor(private readonly user_seeder: UserSeederService) {}

	async run(): Promise<void> {
		await this.user_seeder.run();
	}
}
