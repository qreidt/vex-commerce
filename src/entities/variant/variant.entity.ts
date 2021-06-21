import {
	Column,
	DeleteDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
} from 'typeorm';
import BaseEntity from '../base/base.entity';
import IVariant from './variant.interface';
import ProductEntity from '../product/product.entity';

@Entity({ name: 'variants' })
export default class VariantEntity extends BaseEntity implements IVariant {
	public product_id: number;

	@Column({ name: 'name', type: 'varchar' })
	public name: string;

	@Column({ name: 'slug', type: 'varchar', unique: true })
	public slug: string;

	@Column({ name: 'stock_amount', type: 'integer' })
	public stock_amount: number;

	@Column({ name: 'reserved_amount', type: 'integer' })
	public reserved_amount: number;

	@Column({ name: 'price', type: 'decimal', precision: 20, scale: 3 })
	public price: number;

	@ManyToOne(() => ProductEntity, (product) => product.variants, {})
	@JoinColumn({ name: 'product_id' })
	public product: ProductEntity;

	@DeleteDateColumn({ name: 'deleted_at', type: 'datetime', nullable: true })
	public deleted_at?: Date;
}
