import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export default class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  users_id: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column("timestamp")
  created_at: string;

  @Column("timestamp")
  updated_at: string;
}
