import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("accounts")
class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column()
  status: string;

  @Column("timestamp")
  created_at: string;

  @Column("timestamp")
  updated_at: string;
}

export default Account;
