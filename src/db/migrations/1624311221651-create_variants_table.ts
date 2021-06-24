import {
	MigrationInterface,
	QueryRunner,
	Table,
	TableForeignKey,
	TableIndex,
} from 'typeorm';

export class createVariantsTable1624311221651 implements MigrationInterface {
	private table_name = 'variants';

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
						name: 'product_id',
						type: 'bigint unsigned',
					},
					{
						name: 'name',
						type: 'varchar',
					},
					{
						name: 'stock_amount',
						type: 'integer',
					},
					{
						name: 'reserved_amount',
						type: 'integer',
					},
					{
						name: 'price',
						type: 'decimal',
						precision: 20,
						scale: 3,
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
				name: `${this.table_name}_price_index`,
				columnNames: ['price'],
				isUnique: true,
			}),
		);

		await queryRunner.createForeignKey(
			this.table_name,
			new TableForeignKey({
				name: `${this.table_name}_product_id_foreign`,
				columnNames: ['product_id'],
				referencedTableName: 'products',
				referencedColumnNames: ['id'],
				onDelete: 'cascade',
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable(this.table_name);
	}
}
