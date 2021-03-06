import * as Faker from 'faker';
import * as Factory from 'typeorm-factories';
import UserEntity from './user/user.entity';
import ProductEntity from './product/product.entity';
import VariantEntity from './product_variant/product_variant.entity';
import CategoryEntity from './category/category.entity';

// UserFactory
Factory.define(UserEntity, (faker: typeof Faker) => {
	const user = new UserEntity();

	user.name = faker.name.findName();
	user.email = faker.internet.email();
	user.type = faker.random.arrayElement(Object.values(UserEntity.TYPES));

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	user.password = UserEntity.hashPassword(faker.internet.password());

	return user;
});

Factory.define(ProductEntity, (faker: typeof Faker) => {
	const product = new ProductEntity();

	product.name = faker.commerce.productName();
	product.slug = faker.helpers.slugify(product.name.toLowerCase());

	return product;
});

Factory.define(
	VariantEntity,
	(faker: typeof Faker, { product }: { product: ProductEntity }) => {
		const variant = new VariantEntity();

		variant.product_id = product.id;
		variant.name = product.name;
		variant.stock_amount = faker.datatype.number(5);
		variant.reserved_amount = faker.datatype.number(5);
		variant.price = Number.parseFloat(faker.commerce.price());

		return variant;
	},
);

Factory.define(CategoryEntity, (faker: typeof Faker) => {
	const category = new CategoryEntity();

	category.name = faker.commerce.department();
	category.slug = faker.helpers.slugify(category.name.toLowerCase());

	return category;
});

export default Factory;
