import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from '../../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ClientsService {
	constructor(
		@InjectRepository(UserEntity)
		readonly user_repository: Repository<UserEntity>,
	) {}

	async list() {
		const users = await this.user_repository.find({
			type: UserEntity.TYPES.client,
		});

		return users.map((user: UserEntity) => user.toJSON());
	}

	async findOne(id: number) {
		const user = await this.user_repository.findOne({
			id: id,
			type: UserEntity.TYPES.client,
		});

		if (!user) {
			throw new NotFoundException();
		}

		return user;
	}
}
