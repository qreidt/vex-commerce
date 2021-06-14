import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import * as bcrypt from 'bcrypt';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
	public static TYPES = {
		administrator: 1,
		client: 2,
	};

	@PrimaryGeneratedColumn()
	public id?: number;

	@Column()
	public email: string;

	@Column()
	public name: string;

	@Column()
	public password: string;

	@Column()
	public type: number;

	static async hashPassword(password) {
		return await bcrypt.hash(password, 12);
	}

	toJSON() {
		const user = Object.assign({}, this);

		delete user.password;

		return user;
	}
}
