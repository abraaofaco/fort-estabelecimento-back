import IEstablishmentAddresses from "./IEstablishmentAddresses";

export default interface IEstablishment {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  addresses: IEstablishmentAddresses[];
}
