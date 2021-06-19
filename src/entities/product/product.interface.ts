import BaseInterface from '../base/base.interface';

export default interface IUser extends BaseInterface {
	name: string;
	email: string;
	password: string;
	type: number;
}
