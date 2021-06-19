import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import UserEntity from '../../../entities/user/user.entity';
import CreateAdministratorDto from './dto/create-administrator.dto';
import UpdateAdministratorDto from './dto/update-administrator.dto';

@Injectable()
export default class AdministratorsService {
	constructor(
		@InjectRepository(UserEntity)
		readonly repository: Repository<UserEntity>,
	) {}

	list() {
		return this.repository.find({
			type: UserEntity.TYPES.administrator,
		});
	}

	async create(data: CreateAdministratorDto) {
		await this.failIfEmailExists(data.email);

		const user = this.repository.merge(new UserEntity(), {
			...data,
			type: UserEntity.TYPES.administrator,
		});

		user.password = await UserEntity.hashPassword(user.password);

		return await this.repository.save(user);
	}

	async findOne(id: number): Promise<UserEntity> {
		const user = await this.repository.findOne({
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

		await this.failIfEmailExists(data.email);

		user = this.repository.merge(user, data);

		return await this.repository.save(user);
	}

	async remove(id: number): Promise<void> {
		const user = await this.findOne(id);

		if (!user) {
			throw new NotFoundException();
		}

		await this.repository.delete({
			id: user.id,
		});
	}

	private async failIfEmailExists(email): Promise<void> {
		const exists = await this.repository.findOne({ email });

		if (exists) {
			throw new BadRequestException({
				status: 400,
				errors: ['Email is Already in Use'],
				error: 'Bad Request',
			});
		}
	}
}
