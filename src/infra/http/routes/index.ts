import { Router } from "express";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import establishmentsRouter from "./establishments.routes";
import sessionsRouter from "./sessions.routes";
import usersRouter from "./users.routes";

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);

routes.use(ensureAuthenticated);

routes.use("/establishments", establishmentsRouter);

export default routes;
