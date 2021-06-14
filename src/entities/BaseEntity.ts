import {
	AfterInsert,
	AfterLoad,
	BeforeInsert,
	BeforeUpdate,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { DateTime } from 'luxon';

@Entity()
export class BaseEntity {
	@PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
	public id?: number;

	@CreateDateColumn({ name: 'created_at' })
	public created_at?: Date | DateTime;

	@UpdateDateColumn({ name: 'updated_at' })
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
