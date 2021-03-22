import UsersController from "@modules/users/controllers/UsersController";
import { celebrate, Joi, Segments } from "celebrate";
import { classToClass } from "class-transformer";
import { Router } from "express";

const usersRouter = Router();

const usersController = new UsersController();

usersRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required().max(200),
      email: Joi.string().email().required().max(150),
      password: Joi.string().required().min(6),
    },
  }),
  async (request, response) => {
    const { name, email, password } = request.body;

    const user = await usersController.create({ name, email, password });

    return response.json(classToClass(user));
  }
);

export default usersRouter;
