module.exports = {
	type: process.env.DB_CLIENT ?? 'mariadb',
	host: process.env.DB_HOST ?? 'localhost',
	port: parseInt(process.env.DB_PORT) ?? 3306,
	username: process.env.DB_USER ?? 'root',
	password: process.env.DB_PASS ?? '',
	database: process.env.DB_NAME ?? 'commerce',
	logging: process.env.DB_LOGGING ?? false,
	migrationsTableName: 'migrations',
	migrations: ['dist/src/db/migrations/*.{ts,js}'],
	entities: ['dist/src/entities/**/*.entity.js'],
	cli: {
		migrationsDir: 'src/db/migrations',
	},
};
