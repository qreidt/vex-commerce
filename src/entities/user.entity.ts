import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
	public static readonly TYPES = {
		administrator: 1,
		user: 2,
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
}
