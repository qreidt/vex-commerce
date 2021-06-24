import BaseInterface from '../base/base.interface';

export default interface ICategory extends BaseInterface {
	category_id?: number;
	name: string;
	slug: string;
	deleted_at?: Date;
}
