import { container } from "tsyringe";

import ICreateEstablishmentDTO from "../dtos/ICreateEstablishmentDTO";
import IUpdateEstablishmentDTO from "../dtos/IUpdateEstablishmentDTO";
import IEstablishment from "../repositories/model/IEstablishment";
import CreateEstablishmentAddressesService from "../services/CreateEstablishmentAddressesService";
import DeleteEstablishmentAddressesService from "../services/DeleteEstablishmentAddressesService";
import ListEstablishmentAddressesService from "../services/ListEstablishmentAddressesService";
import ListEstablishmentAddressNameService from "../services/ListEstablishmentAddressNameService";
import UpdateEstablishmentAddressesService from "../services/UpdateEstablishmentAddressesService";

export default class EstablishmentAddressesController {
  public async findAll(): Promise<IEstablishment[]> {
    const addressesService = container.resolve(
      ListEstablishmentAddressesService
    );

    const response = await addressesService.execute();

    return response;
  }

  public async searchByAddressName(query: string): Promise<IEstablishment[]> {
    const addressesService = container.resolve(
      ListEstablishmentAddressNameService
    );

    const response = await addressesService.execute(query);

    return response;
  }

  public async create(data: ICreateEstablishmentDTO): Promise<IEstablishment> {
    const addressesService = container.resolve(
      CreateEstablishmentAddressesService
    );

    const response = await addressesService.execute(data);

    return response;
  }

  public async update(data: IUpdateEstablishmentDTO): Promise<IEstablishment> {
    const addressesService = container.resolve(
      UpdateEstablishmentAddressesService
    );

    const response = await addressesService.execute(data);

    return response;
  }

  public async delete(addresseId: string): Promise<void> {
    const addressesService = container.resolve(
      DeleteEstablishmentAddressesService
    );

    await addressesService.execute(addresseId);
  }
}
