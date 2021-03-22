import CreateUserService from "@modules/users/services/CreateUserService";
import { container } from "tsyringe";

import IUser from "../repositories/model/IUser";

interface IResquest {
  name: string;
  email: string;
  password: string;
}

export default class UsersController {
  public async create({ name, email, password }: IResquest): Promise<IUser> {
    const createUser = container.resolve(CreateUserService);

    return createUser.execute({ name, email, password });
  }
}
