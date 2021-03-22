import { injectable, inject } from "tsyringe";

import IEstablishmentsRepository from "../repositories/IEstablishmentsRepository";
import IEstablishments from "../repositories/model/IEstablishment";

@injectable()
class ListEstablishmentAddressesService {
  constructor(
    @inject("EstablishmentsRepository")
    private establishmentsRepository: IEstablishmentsRepository
  ) {}

  public async execute(): Promise<IEstablishments[]> {
    const establishment = await this.establishmentsRepository.findAll();

    return establishment;
  }
}

export default ListEstablishmentAddressesService;
