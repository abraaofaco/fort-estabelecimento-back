import AuthenticateUserService from "@modules/users/services/AuthenticateUserService";
import { container } from "tsyringe";

import ICreateSessionUserDTO from "../dtos/ICreateSessionUserDTO";
import IUser from "../repositories/model/IUser";

interface IResponse {
  user: IUser;
  token: string;
}

export default class SessionsController {
  public async create({
    email,
    password,
  }: ICreateSessionUserDTO): Promise<IResponse> {
    const authenticateUser = container.resolve(AuthenticateUserService);

    const response = await authenticateUser.execute({
      email,
      password,
    });

    return response;
  }
}
