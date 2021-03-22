import IEstablishment from "./IEstablishment";

export default interface IEstablishmentAddresses {
  id: string;
  establishmentId: string;
  address: string;
  number: string;
  district: string;
  city: string;
  state: string;
  country: string;
  createdAt: Date;
  updatedAt: Date;
  establishment: IEstablishment;
}
