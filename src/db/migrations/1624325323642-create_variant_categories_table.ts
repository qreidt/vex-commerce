import {
	MigrationInterface,
	QueryRunner,
	Table,
	TableForeignKey,
} from 'typeorm';

export class createVariantCategoriesTable1624325323642
	implements MigrationInterface
{
	private table_name = 'variant_categories';
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: this.table_name,
				columns: [
					{
						name: 'category_id',
						type: 'bigint',
						unsigned: true,
						isPrimary: true,
					},
					{
						name: 'variant_id',
						type: 'bigint',
						unsigned: true,
						isPrimary: true,
					},
				],
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

		await queryRunner.createForeignKey(
			this.table_name,
			new TableForeignKey({
				name: `${this.table_name}_variant_id_foreign`,
				columnNames: ['variant_id'],
				referencedTableName: 'variants',
				referencedColumnNames: ['id'],
				onDelete: 'cascade',
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable(this.table_name);
	}
}
