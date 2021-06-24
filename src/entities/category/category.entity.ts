import {
	Column,
	DeleteDateColumn,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
} from 'typeorm';
import BaseEntity from '../base/base.entity';
import ICategory from './category.interface';
import ProductEntity from '../product/product.entity';

@Entity({ name: 'categories' })
export default class CategoryEntity extends BaseEntity implements ICategory {
	public category_id: number;

	@Column({ name: 'name', type: 'varchar' })
	public name: string;

	@Column({ name: 'slug', type: 'integer', unique: true })
	public slug: string;

	@DeleteDateColumn({ name: 'deleted_at', type: 'datetime', nullable: true })
	public deleted_at?: Date;

	@ManyToOne(() => CategoryEntity, (category) => category.category)
	@JoinColumn({ name: 'category_id' })
	public category: CategoryEntity;

	@ManyToMany(() => ProductEntity)
	@JoinColumn({ name: 'category_id' })
	@JoinTable({
		name: 'product_categories',
		joinColumn: { name: 'category_id' },
		inverseJoinColumn: { name: 'product_id' },
	})
	public products: ProductEntity[];
}
