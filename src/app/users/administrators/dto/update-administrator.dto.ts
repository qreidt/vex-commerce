import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateAdministratorDto {
	@IsNotEmpty()
	name: string;

	@IsEmail()
	email: string;
}
