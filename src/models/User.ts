import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn()
  id: Number;

  @Column()
  name: String;

  @Column()
  cpf: String;

  @Column("date")
  birthday: Date;

  @Column()
  mothers_name: String;

  @Column("timestamp")
  created_at: String;

  @Column("timestamp")
  updated_at: String;
}
