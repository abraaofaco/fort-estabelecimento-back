import IEstablishmentAddressesDTO from "./IEstablishmentAddressesDTO";

export default interface ICreateEstablishmentDTO {
  name: string;
  address: IEstablishmentAddressesDTO;
}
