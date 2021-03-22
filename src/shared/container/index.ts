import EstablishmentAddressesRepository from "@infra/database/typeorm/repositories/EstablishmentAddressesRepository";
import EstablishmentsRepository from "@infra/database/typeorm/repositories/EstablishmentsRepository";
import UsersRepository from "@infra/database/typeorm/repositories/UsersRepository";
import IEstablishmentAddressesRepository from "@modules/establishments/repositories/IEstablishmentAddressesRepository";
import IEstablishmentsRepository from "@modules/establishments/repositories/IEstablishmentsRepository";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import { container } from "tsyringe";
import "@infra/providers/container";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IEstablishmentsRepository>(
  "EstablishmentsRepository",
  EstablishmentsRepository
);

container.registerSingleton<IEstablishmentAddressesRepository>(
  "EstablishmentAddressesRepository",
  EstablishmentAddressesRepository
);
