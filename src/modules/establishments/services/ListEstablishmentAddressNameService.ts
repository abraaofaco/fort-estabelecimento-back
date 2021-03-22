import { injectable, inject } from "tsyringe";

import IEstablishmentsRepository from "../repositories/IEstablishmentsRepository";
import IEstablishments from "../repositories/model/IEstablishment";

@injectable()
class ListEstablishmentAddressNameService {
  constructor(
    @inject("EstablishmentsRepository")
    private establishmentsRepository: IEstablishmentsRepository
  ) {}

  public async execute(query: string): Promise<IEstablishments[]> {
    const establishment = await this.establishmentsRepository.searchByAddressName(
      query
    );

    return establishment;
  }
}

export default ListEstablishmentAddressNameService;
