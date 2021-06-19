// import { DeepPartial } from 'typeorm';
import * as Factory from 'typeorm-factories';
import * as Faker from 'faker';
import UserEntity from './user/user.entity';
import ProductEntity from './product/product.entity';

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
	product.slug = faker.helpers.slugify(product.name);

	return product;
});

export default Factory;
