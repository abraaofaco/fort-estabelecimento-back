import IEstablishmentAddresses from "@modules/establishments/repositories/model/IEstablishmentAddresses";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  BeforeUpdate,
  BeforeInsert,
} from "typeorm";

import Establishment from "./Establishment";

@Entity("establishment_addresses")
export default class EstablishmentAddresses implements IEstablishmentAddresses {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "establishment_id" })
  establishmentId: string;

  @Column()
  address: string;

  @Column()
  number: string;

  @Column()
  district: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  country: string;

  @CreateDateColumn()
  @Column({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn()
  @Column({ name: "updated_at" })
  updatedAt: Date;

  @ManyToOne(() => Establishment, (establishment) => establishment.addresses)
  @JoinColumn({ name: "establishment_id" })
  establishment: Establishment;

  @BeforeInsert()
  @BeforeUpdate()
  createFirebaseUser(): void {
    this.address = this.address.toUpperCase();
    this.number = this.number.toUpperCase();
    this.district = this.district.toUpperCase();
    this.city = this.city.toUpperCase();
    this.state = this.state.toUpperCase();
    this.country = this.country.toUpperCase();
  }
}
