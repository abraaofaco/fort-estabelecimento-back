import IUser from "@modules/users/repositories/model/IUser";
import { Exclude } from "class-transformer";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("users")
export default class User implements IUser {
  @PrimaryGeneratedColumn("uuid")
  @Exclude()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ name: "is_enable" })
  @Exclude()
  isEnable: boolean;

  @CreateDateColumn()
  @Exclude()
  @Column({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  @Column({ name: "updated_at" })
  updatedAt: Date;
}
