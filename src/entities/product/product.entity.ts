import {
	Column,
	DeleteDateColumn,
	Entity,
	JoinColumn,
	OneToMany,
} from 'typeorm';
import BaseEntity from '../base/base.entity';
import IProduct from './product.interface';
import VariantEntity from '../variant/variant.entity';

@Entity({ name: 'products' })
export default class ProductEntity extends BaseEntity implements IProduct {
	@Column({ name: 'name', type: 'varchar' })
	public name: string;

	@Column({ name: 'slug', type: 'varchar', unique: true })
	public slug: string;

	@DeleteDateColumn({ name: 'deleted_at', type: 'datetime', nullable: true })
	public deleted_at?: Date;

	@OneToMany(() => VariantEntity, (variant) => variant.product)
	@JoinColumn({ name: 'product_id' })
	public variants: VariantEntity;
}
