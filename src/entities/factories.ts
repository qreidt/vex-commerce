import { DeepPartial } from 'typeorm';
import UserEntity from './user/user.entity';
import faker from 'faker';

export async function userFactory(data: DeepPartial<UserEntity>): Promise<UserEntity> {
	return Object.assign(new UserEntity(), {
		name: data.name ?? faker.name.findName(),
		email: data.email ?? faker.internet.email(),
		password: await UserEntity.hashPassword(data.password ?? faker.internet.password()),
		type: data.type ?? faker.random.arrayElement(Object.values(UserEntity.TYPES)),
	});
}
