import SessionsController from "@modules/users/controllers/SessionsController";
import { celebrate, Joi, Segments } from "celebrate";
import { classToClass } from "class-transformer";
import { Router } from "express";

const sessionsRouter = Router();

const sessionsController = new SessionsController();

sessionsRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  async (request, response) => {
    const { email, password } = request.body;

    const session = await sessionsController.create({ email, password });

    return response.json(classToClass(session));
  }
);

export default sessionsRouter;
