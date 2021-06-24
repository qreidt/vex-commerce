import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class createProductsTable1624138163419 implements MigrationInterface {
	private table_name = 'products';

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
						name: 'slug',
						type: 'varchar',
					},
					{
						name: 'created_at',
						type: 'timestamp',
					},
					{
						name: 'updated_at',
						type: 'timestamp',
					},
					{
						name: 'deleted_at',
						type: 'timestamp',
						isNullable: true,
					},
				],
			}),
		);

		await queryRunner.createIndex(
			this.table_name,
			new TableIndex({
				name: `${this.table_name}_slug_unique`,
				columnNames: ['slug'],
				isUnique: true,
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable(this.table_name);
	}
}
