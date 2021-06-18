import {
	AfterInsert,
	AfterLoad,
	BeforeInsert,
	BeforeUpdate,
	CreateDateColumn,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { DateTime } from 'luxon';

export default class BaseEntity {
	@PrimaryGeneratedColumn({ name: 'id', type: 'integer', unsigned: true })
	public id?: number;

	@CreateDateColumn({ name: 'created_at', type: 'datetime' })
	public created_at?: Date | DateTime;

	@UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
	public updated_at?: Date | DateTime;

	@AfterInsert()
	@AfterLoad()
	castIdToNumber() {
		this.id = Number(this.id);
	}

	@BeforeInsert()
	setTimestamps(): void {
		this.created_at = DateTime.now().toJSDate();
		this.updated_at = DateTime.now().toJSDate();
	}

	@BeforeUpdate()
	updateTimestamp(): void {
		this.updated_at = DateTime.now().toJSDate();
	}
}
