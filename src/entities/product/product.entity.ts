import { Column, DeleteDateColumn, Entity } from 'typeorm';
import BaseEntity from '../base/base.entity';

@Entity({ name: 'products' })
export default class ProductEntity extends BaseEntity {
	@Column({ name: 'name', type: 'varchar' })
	public name: string;

	@Column({ name: 'slug', type: 'varchar', unique: true })
	public slug: string;

	@DeleteDateColumn({ name: 'deleted_at', type: 'datetime', nullable: true })
	public deleted_at?: Date;
}
