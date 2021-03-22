import IEstablishmentAddressesDTO from "./IEstablishmentAddressesDTO";

export default interface IUpdateEstablishmentDTO {
  name: string;
  addressId: string;
  address: IEstablishmentAddressesDTO;
}
