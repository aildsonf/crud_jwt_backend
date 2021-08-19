import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import bcrypt from "bcryptjs";

@Entity("accounts")
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column("timestamp")
  created_at: string;

  @Column("timestamp")
  updated_at: string;

  @BeforeInsert()
  @BeforeUpdate()
  encryptPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }
}
