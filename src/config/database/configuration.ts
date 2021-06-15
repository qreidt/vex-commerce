import { registerAs } from '@nestjs/config';

export default registerAs('database.mysql', () => ({
	client: process.env.DB_CLIENT,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	user: process.env.DB_USER,
	pass: process.env.DB_PASS,
	database: process.env.DB_DATABASE,
	logging: process.env.DB_LOGGING,
}));
