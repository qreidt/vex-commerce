import { registerAs } from '@nestjs/config';

export const app = registerAs('app', () => ({
	name: process.env.NAME,
	port: process.env.PORT,
	env: process.env.ENV,
	key: process.env.KEY,
}));

export const database = registerAs('db.sql', () => ({
	client: process.env.DB_CLIENT,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	user: process.env.DB_USER,
	pass: process.env.DB_PASS,
	database: process.env.DB_DATABASE,
	logging: process.env.DB_LOGGING,
	db_syncronize: process.env.DB_SYNCRONIZE,
	db_drop_schema: process.env.DB_DROP_SCHEMA,
}));
