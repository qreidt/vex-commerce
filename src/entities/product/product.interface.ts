import BaseInterface from '../base/base.interface';

export default interface IProduct extends BaseInterface {
	name: string;
	slug: string;
	deleted_at?: Date;
}
