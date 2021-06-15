import { Column, Entity } from 'typeorm';
import BaseEntity from './base.entity';
import * as bcrypt from 'bcrypt';
import { Exclude, Transform } from 'class-transformer';

@Entity({ name: 'users' })
export default class UserEntity extends BaseEntity {
	public static TYPES = {
		administrator: 1,
		client: 2,
	};

	public static get TypesText() {
		const swap = Object.entries(UserEntity.TYPES).map(([a, b]) => ({
			[b]: a,
		}));

		return Object.assign({}, ...swap);
	}

	@Column({ name: 'email', type: 'varchar' })
	public email: string;

	@Column({ name: 'name', type: 'varchar' })
	public name: string;

	@Exclude()
	@Column({ name: 'password', type: 'varchar' })
	public password: string;

	@Transform(({ value }) => UserEntity.TypesText[value])
	@Column({ name: 'type', type: 'tinyint' })
	public type: number;

	static async hashPassword(password) {
		return await bcrypt.hash(password, 12);
	}
}
