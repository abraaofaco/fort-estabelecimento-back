import IHashProvider from "@infra/providers/HashProvider/IHashProvider";
import { sign } from "jsonwebtoken";
import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";

import ICreateSessionUserDTO from "../dtos/ICreateSessionUserDTO";
import IUsersRepository from "../repositories/IUsersRepository";
import IUser from "../repositories/model/IUser";

interface IResponse {
  user: IUser;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    email,
    password,
  }: ICreateSessionUserDTO): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new AppError("Combinação incorreta de e-mail/senha", 401);

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password
    );

    if (!passwordMatched)
      throw new AppError("Combinação incorreta de e-mail/senha", 401);

    const secret = process.env.APP_SECRET || "default";

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn: "1d",
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
