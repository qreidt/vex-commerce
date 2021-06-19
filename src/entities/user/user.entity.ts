import * as bcrypt from 'bcrypt';
import { Column, Entity } from 'typeorm';
import IUser from './user.interface';
import BaseEntity from '../base/base.entity';
import { Exclude, Transform } from 'class-transformer';

@Entity({ name: 'users' })
export default class UserEntity extends BaseEntity implements IUser {
	public static TYPES = {
		administrator: 1,
		client: 2,
	};

	public static get typesText() {
		const swap = Object.entries(UserEntity.TYPES).map(([a, b]) => ({
			[b]: a,
		}));

		return Object.assign({}, ...swap);
	}

	@Column({ name: 'email', type: 'varchar', unique: true })
	public email: string;

	@Column({ name: 'name', type: 'varchar' })
	public name: string;

	@Exclude()
	@Column({ name: 'password', type: 'varchar' })
	public password: string;

	@Transform(({ value }) => UserEntity.typesText[value])
	@Column({ name: 'type', type: 'tinyint' })
	public type: number;

	static async hashPassword(password) {
		return await bcrypt.hash(password, 12);
	}
}
