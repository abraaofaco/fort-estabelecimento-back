import IEstablishmentAddressesDTO from "../dtos/IEstablishmentAddressesDTO";
import IEstablishmentAddresses from "./model/IEstablishmentAddresses";

export default interface IEstablishmentAddressesRepository {
  findById(id: string): Promise<IEstablishmentAddresses | undefined>;
  create(
    establishmentId: string,
    data: IEstablishmentAddressesDTO
  ): Promise<IEstablishmentAddresses>;
  update(data: IEstablishmentAddresses): Promise<void>;
  delete(id: string): Promise<void>;
}
