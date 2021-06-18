import { InjectRepository } from '@nestjs/typeorm';
import UserEntity from '../../../entities/user/user.entity';
import { Repository } from 'typeorm';
import { userFactory } from '../../../entities/factories';

export default class UserSeederService {
	constructor(@InjectRepository(UserEntity) private readonly repository: Repository<UserEntity>) {}

	async run(): Promise<void> {
		const count = await this.repository.createQueryBuilder().getCount();

		if (count > 0) {
			return;
		}

		await this.repository.save(
			await userFactory({
				name: 'Caio Reidt',
				email: 'caioreidt@gmail.com',
				password: '12345678',
				type: UserEntity.TYPES.administrator,
			}),
		);
	}
}
