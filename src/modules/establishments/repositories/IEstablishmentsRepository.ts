import IEstablishmentAddressesDTO from "../dtos/IEstablishmentAddressesDTO";
import IEstablishment from "./model/IEstablishment";

export default interface IEstablishmentsRepository {
  findById(id: string): Promise<IEstablishment | undefined>;
  findByName(name: string): Promise<IEstablishment | undefined>;
  findAll(): Promise<IEstablishment[]>;
  findByAddressId(id: string): Promise<IEstablishment | undefined>;
  searchByAddressName(query: string): Promise<IEstablishment[]>;
  create(
    name: string,
    addresse?: IEstablishmentAddressesDTO
  ): Promise<IEstablishment>;
  delete(id: string): Promise<void>;
}
