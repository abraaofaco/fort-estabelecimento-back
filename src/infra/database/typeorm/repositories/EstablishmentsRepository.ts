import IEstablishmentAddressesDTO from "@modules/establishments/dtos/IEstablishmentAddressesDTO";
import IEstablishmentsRepository from "@modules/establishments/repositories/IEstablishmentsRepository";
import IEstablishment from "@modules/establishments/repositories/model/IEstablishment";
import { getRepository, Repository } from "typeorm";

import Establishment from "../entities/Establishment";

class EstablishmentsRepository implements IEstablishmentsRepository {
  private ormRepository: Repository<Establishment>;

  constructor() {
    this.ormRepository = getRepository(Establishment);
  }

  public async findById(id: string): Promise<IEstablishment | undefined> {
    const findEstablishment = await this.ormRepository.findOne(id, {
      relations: ["addresses"],
    });

    return findEstablishment;
  }

  public async findByName(name: string): Promise<Establishment | undefined> {
    const findEstablishment = await this.ormRepository.findOne({
      where: { name: name.toUpperCase() },
      relations: ["addresses"],
    });

    return findEstablishment;
  }

  public async findAll(): Promise<IEstablishment[]> {
    const establishments = await this.ormRepository.find({
      relations: ["addresses"],
    });

    return establishments;
  }

  public async findByAddressId(
    id: string
  ): Promise<IEstablishment | undefined> {
    const findEstablishment = await this.ormRepository
      .createQueryBuilder("establishment")
      .innerJoinAndSelect("establishment.addresses", "addresses")
      .where("addresses.id = :uid", { uid: id })
      .getOne();

    return findEstablishment;
  }

  public async searchByAddressName(query: string): Promise<IEstablishment[]> {
    const findEstablishments = await this.ormRepository
      .createQueryBuilder("establishment")
      .innerJoinAndSelect("establishment.addresses", "addresses")
      .where("addresses.address like :address", {
        address: `%${query.toUpperCase()}%`,
      })
      .limit(3)
      .getMany();

    return findEstablishments;
  }

  public async create(
    name: string,
    address?: IEstablishmentAddressesDTO
  ): Promise<Establishment> {
    const data = { name };

    if (address) Object.assign(data, { addresses: [address] });

    const establishmentAddresses = this.ormRepository.create(data);

    await this.ormRepository.save(establishmentAddresses);

    return establishmentAddresses;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default EstablishmentsRepository;
