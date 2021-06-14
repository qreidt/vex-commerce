import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class createUsersTable1623526534508 implements MigrationInterface {
	private table_name = 'users';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: this.table_name,
				columns: [
					{
						name: 'id',
						type: 'bigint unsigned',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment',
					},
					{
						name: 'name',
						type: 'varchar',
					},
					{
						name: 'email',
						type: 'varchar',
					},
					{
						name: 'password',
						type: 'varchar',
					},
					{
						name: 'type',
						type: 'int',
					},
					{
						name: 'created_at',
						type: 'timestamp',
						isNullable: true,
					},
					{
						name: 'updated_at',
						type: 'timestamp',
						isNullable: true,
					},
				],
			}),
		);

		await queryRunner.createIndex(
			this.table_name,
			new TableIndex({
				name: `${this.table_name}_email_unique`,
				columnNames: ['email'],
				isUnique: true,
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable(this.table_name);
	}
}
