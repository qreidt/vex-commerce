import BaseInterface from '../base/base.interface';

export default interface IProductVariant extends BaseInterface {
	product_id: number;
	name: string;
	stock_amount: number;
	reserved_amount: number;
	price: number;
	deleted_at?: Date;
}
