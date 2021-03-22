import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";

import IUpdateEstablishmentDTO from "../dtos/IUpdateEstablishmentDTO";
import IEstablishmentAddressesRepository from "../repositories/IEstablishmentAddressesRepository";
import IEstablishmentsRepository from "../repositories/IEstablishmentsRepository";
import IEstablishment from "../repositories/model/IEstablishment";

@injectable()
class UpdateEstablishmentAddressesService {
  constructor(
    @inject("EstablishmentsRepository")
    private establishmentsRepository: IEstablishmentsRepository,

    @inject("EstablishmentAddressesRepository")
    private establishmentAddressesRepository: IEstablishmentAddressesRepository
  ) {}

  public async execute({
    name,
    addressId,
    address,
  }: IUpdateEstablishmentDTO): Promise<IEstablishment> {
    const establishmentAddress = await this.establishmentAddressesRepository.findById(
      addressId
    );

    if (!establishmentAddress) throw new AppError("Endereço não localizado");

    Object.assign(establishmentAddress, { ...address });

    const originalEstablishmentAddresses = await this.establishmentsRepository.findByName(
      establishmentAddress.establishment.name
    );

    const establishment = await this.establishmentsRepository.findByName(name);

    const changeEstablishment =
      establishment?.name !== establishmentAddress.establishment.name;

    if (!establishment) {
      establishmentAddress.establishment = await this.establishmentsRepository.create(
        name
      );
    } else if (changeEstablishment) {
      establishmentAddress.establishment = establishment;
    }

    await this.establishmentAddressesRepository.update(establishmentAddress);

    if (
      originalEstablishmentAddresses?.addresses.length === 1 &&
      changeEstablishment
    ) {
      this.establishmentsRepository.delete(originalEstablishmentAddresses.id);
    }

    const result = await this.establishmentsRepository.findByAddressId(
      establishmentAddress.id
    );

    return result as IEstablishment;
  }
}

export default UpdateEstablishmentAddressesService;
