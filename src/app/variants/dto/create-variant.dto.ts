import { IsNotEmpty, IsNumber } from 'class-validator';

export default class CreateVariantDto {
	@IsNotEmpty()
	@IsNumber()
	product_id: number;

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
