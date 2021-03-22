import ICreateUserDTO from "../dtos/ICreateUserDTO";
import IUser from "./model/IUser";

export default interface IUsersRepository {
  findByEmail(email: string): Promise<IUser | undefined>;
  create(data: ICreateUserDTO): Promise<IUser>;
}
