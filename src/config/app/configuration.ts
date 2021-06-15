import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
	name: process.env.NAME,
	port: process.env.PORT,
	env: process.env.ENV,
}));
