import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";

import IEstablishmentAddressesRepository from "../repositories/IEstablishmentAddressesRepository";
import IEstablishmentsRepository from "../repositories/IEstablishmentsRepository";

@injectable()
class DeleteEstablishmentAddressesService {
  constructor(
    @inject("EstablishmentsRepository")
    private establishmentsRepository: IEstablishmentsRepository,

    @inject("EstablishmentAddressesRepository")
    private establishmentAddressesRepository: IEstablishmentAddressesRepository
  ) {}

  public async execute(addressId: string): Promise<void> {
    const establishmentAddress = await this.establishmentAddressesRepository.findById(
      addressId
    );

    if (!establishmentAddress) throw new AppError("Endereço não localizado");

    const establishment = await this.establishmentsRepository.findById(
      establishmentAddress.establishmentId
    );

    if (establishment?.addresses.length === 1) {
      await this.establishmentsRepository.delete(
        establishmentAddress.establishmentId
      );
    } else {
      await this.establishmentAddressesRepository.delete(
        establishmentAddress.id
      );
    }
  }
}

export default DeleteEstablishmentAddressesService;
