import IEstablishment from "@modules/establishments/repositories/model/IEstablishment";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";

import EstablishmentAddresses from "./EstablishmentAddresses";

@Entity("establishments")
export default class Establishment implements IEstablishment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  @Column({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn()
  @Column({ name: "updated_at" })
  updatedAt: Date;

  @OneToMany(
    () => EstablishmentAddresses,
    (establishmentAddresses) => establishmentAddresses.establishment,
    {
      cascade: true,
    }
  )
  addresses: EstablishmentAddresses[];

  @BeforeInsert()
  @BeforeUpdate()
  createFirebaseUser(): void {
    this.name = this.name.toUpperCase();
  }
}
