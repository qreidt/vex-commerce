import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateAdministratorDto {
	@IsNotEmpty()
	name: string;

	@IsEmail()
	email: string;

	@IsNotEmpty()
	password: string;
}
