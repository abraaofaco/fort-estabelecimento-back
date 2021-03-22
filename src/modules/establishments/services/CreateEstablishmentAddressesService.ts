import { injectable, inject } from "tsyringe";

import ICreateEstablishmentDTO from "../dtos/ICreateEstablishmentDTO";
import IEstablishmentAddressesRepository from "../repositories/IEstablishmentAddressesRepository";
import IEstablishmentsRepository from "../repositories/IEstablishmentsRepository";
import IEstablishments from "../repositories/model/IEstablishment";

@injectable()
class CreateEstablishmentAddressesService {
  constructor(
    @inject("EstablishmentsRepository")
    private establishmentsRepository: IEstablishmentsRepository,

    @inject("EstablishmentAddressesRepository")
    private establishmentAddressesRepository: IEstablishmentAddressesRepository
  ) {}

  public async execute({
    name,
    address,
  }: ICreateEstablishmentDTO): Promise<IEstablishments> {
    const establishment = await this.establishmentsRepository.findByName(name);

    let establishmentAddress: IEstablishments;

    if (establishment) {
      const createAddress = await this.establishmentAddressesRepository.create(
        establishment.id,
        address
      );

      establishment.addresses = [createAddress];
      establishmentAddress = establishment;
    } else {
      establishmentAddress = await this.establishmentsRepository.create(
        name,
        address
      );
    }

    return establishmentAddress;
  }
}

export default CreateEstablishmentAddressesService;
