import { IsNotEmpty, IsNumber } from 'class-validator';

export default class UpdateVariantDto {
	@IsNotEmpty()
	name: string;

	@IsNotEmpty()
	@IsNumber()
	stock_amount: number;

	@IsNotEmpty()
	@IsNumber()
	reserved_amount: number;

	@IsNotEmpty()
	@IsNumber()
	price: number;
}
