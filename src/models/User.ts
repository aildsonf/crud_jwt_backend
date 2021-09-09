import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import * as bcrypt from "bcryptjs";

@Entity("User")
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 20 })
  login: string;

  @Column({ length: 100 })
  password: string;

  @Column()
  name: string;

  @Column("date")
  birthday: Date;

  @Column({ unique: true })
  cpf: string;

  @Column()
  mothers_name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  status: string;

  @Column("timestamp")
  created_at: string;

  @Column("timestamp")
  updated_at: string;

  encryptPassword() {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }

  isPasswordValid(rawPassword: string) {
    return bcrypt.compareSync(rawPassword, this.password);
  }
}

export default User;
