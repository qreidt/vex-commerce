import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdministratorDto } from './dto/create-administrator.dto';
import { UpdateAdministratorDto } from './dto/update-administrator.dto';
import { InjectRepository } from '@nestjs/typeorm';
import UserEntity from '../../../entities/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdministratorsService {
	constructor(
		@InjectRepository(UserEntity)
		readonly user_repository: Repository<UserEntity>,
	) {}

	list() {
		return this.user_repository.find({
			type: UserEntity.TYPES.administrator,
		});
	}

	async create(data: CreateAdministratorDto) {
		const user = this.user_repository.merge(new UserEntity(), {
			...data,
			type: UserEntity.TYPES.administrator,
		});

		user.password = await UserEntity.hashPassword(user.password);

		return await this.user_repository.save(user);
	}

	async findOne(id: number): Promise<UserEntity> {
		const user = await this.user_repository.findOne({
			id: id,
			type: UserEntity.TYPES.administrator,
		});

		if (!user) {
			throw new NotFoundException();
		}

		return user;
	}

	async update(id: number, data: UpdateAdministratorDto) {
		let user = await this.findOne(id);

		user = this.user_repository.merge(user, data);

		return await this.user_repository.save(user);
	}

	async remove(id: number): Promise<void> {
		const user = await this.findOne(id);

		await this.user_repository.delete({
			id: user.id,
		});
	}
}
