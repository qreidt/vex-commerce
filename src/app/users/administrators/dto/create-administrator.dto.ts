import { IsEmail, IsNotEmpty } from 'class-validator';

export default class CreateAdministratorDto {
	@IsNotEmpty()
	name: string;

	@IsEmail()
	email: string;

	@IsNotEmpty()
	password: string;
}
