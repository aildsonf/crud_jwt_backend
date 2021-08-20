import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  account_id: string;

  @Column()
  name: string;

  @Column()
  cpf: string;

  @Column("date")
  birthday: Date;

  @Column()
  mothers_name: string;

  @Column("timestamp")
  created_at: string;

  @Column("timestamp")
  updated_at: string;
}
