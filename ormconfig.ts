module.exports = {
	type: process.env.DB_CLIENT ?? 'mariadb',
	host: process.env.DB_HOST ?? 'localhost',
	port: parseInt(process.env.DB_PORT) ?? 3306,
	username: process.env.DB_USER ?? 'root',
	password: process.env.DB_PASS ?? '',
	database: process.env.DB_NAME ?? 'commerce',
	migrationsTableName: 'migrations',
	entities: ['dist/src/entities/*.{ts,js}'],
	cli: {
		migrationsDir: 'src/database/migrations',
	},
	logging: process.env.DB_LOGGING !== 'false',
};
