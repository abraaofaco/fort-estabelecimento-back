import IEstablishmentAddressesDTO from "@modules/establishments/dtos/IEstablishmentAddressesDTO";
import IEstablishmentAddressesRepository from "@modules/establishments/repositories/IEstablishmentAddressesRepository";
import { getRepository, Repository } from "typeorm";

import EstablishmentAddresses from "../entities/EstablishmentAddresses";

class EstablishmentAddressesRepository
  implements IEstablishmentAddressesRepository {
  private ormRepository: Repository<EstablishmentAddresses>;

  constructor() {
    this.ormRepository = getRepository(EstablishmentAddresses);
  }

  public async findById(
    id: string
  ): Promise<EstablishmentAddresses | undefined> {
    const addresse = await this.ormRepository.findOne(id, {
      relations: ["establishment"],
    });

    return addresse;
  }

  public async create(
    establishmentId: string,
    data: IEstablishmentAddressesDTO
  ): Promise<EstablishmentAddresses> {
    const establishmentAddresses = this.ormRepository.create({
      establishmentId,
      ...data,
    });

    await this.ormRepository.save(establishmentAddresses);

    return establishmentAddresses;
  }

  public async update(data: EstablishmentAddresses): Promise<void> {
    await this.ormRepository.save(data);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default EstablishmentAddressesRepository;
