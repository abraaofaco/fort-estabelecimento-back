import IHashProvider from "@infra/providers/HashProvider/IHashProvider";
import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";

import ICreateUserDTO from "../dtos/ICreateUserDTO";
import IUsersRepository from "../repositories/IUsersRepository";
import IUser from "../repositories/model/IUser";

@injectable()
class CreateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<IUser> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) throw new AppError("Endereço de email já usado.");

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
