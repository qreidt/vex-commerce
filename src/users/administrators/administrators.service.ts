import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdministratorDto } from './dto/create-administrator.dto';
import { UpdateAdministratorDto } from './dto/update-administrator.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdministratorsService {
	constructor(
		@InjectRepository(UserEntity)
		readonly user_repository: Repository<UserEntity>,
	) {}

	async list() {
		const users = await this.user_repository.find({
			type: UserEntity.TYPES.administrator,
		});

		return users.map((user: UserEntity) => user.toJSON());
	}

	async create(data: CreateAdministratorDto) {
		let user = this.user_repository.merge(new UserEntity(), {
			...data,
			type: UserEntity.TYPES.administrator,
		});

		user.password = await UserEntity.hashPassword(user.password);

		user = await this.user_repository.save(user);

		return user.toJSON();
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

		user = await this.user_repository.save(user);

		return user.toJSON();
	}

	async remove(id: number) {
		return `This action removes a #${id} administrator`;
	}
}
