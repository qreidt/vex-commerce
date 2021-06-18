import { IsEmail, IsNotEmpty } from 'class-validator';

export default class UpdateAdministratorDto {
	@IsNotEmpty()
	name: string;

	@IsEmail()
	email: string;
}
