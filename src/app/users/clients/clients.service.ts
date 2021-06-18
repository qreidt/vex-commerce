import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import UserEntity from '../../../entities/user/user.entity';

@Injectable()
export default class ClientsService {
	constructor(
		@InjectRepository(UserEntity)
		readonly repository: Repository<UserEntity>,
	) {}

	list() {
		return this.repository.find({
			type: UserEntity.TYPES.client,
		});
	}

	async findOne(id: number) {
		const user = await this.repository.findOne({
			id: id,
			type: UserEntity.TYPES.client,
		});

		if (!user) {
			throw new NotFoundException();
		}

		return user;
	}
}
