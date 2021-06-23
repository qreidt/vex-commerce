import {
	MigrationInterface,
	QueryRunner,
	Table,
	TableForeignKey,
	TableIndex,
} from 'typeorm';

export class createCategoriesTable1624323749463 implements MigrationInterface {
	private table_name = 'categories';

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
						name: 'category_id',
						type: 'bigint unsigned',
						isNullable: true,
					},
					{
						name: 'name',
						type: 'varchar',
					},
					{
						name: 'slug',
						type: 'varchar',
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

		await queryRunner.createForeignKey(
			this.table_name,
			new TableForeignKey({
				name: `${this.table_name}_category_id_foreign`,
				columnNames: ['category_id'],
				referencedTableName: 'categories',
				referencedColumnNames: ['id'],
				onDelete: 'cascade',
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable(this.table_name);
	}
}
