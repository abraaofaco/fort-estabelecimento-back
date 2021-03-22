import EstablishmentAddressesController from "@modules/establishments/controllers/EstablishmentAddressesController";
import { celebrate, Joi, Segments } from "celebrate";
import { classToClass } from "class-transformer";
import { Router } from "express";

const establishmentsRouter = Router();

const establishmentAddressesController = new EstablishmentAddressesController();

establishmentsRouter.get("/", async (request, response) => {
  const establishmentAddresses = await establishmentAddressesController.findAll();

  return response.json(classToClass(establishmentAddresses));
});

establishmentsRouter.get("/search", async (request, response) => {
  const { query } = request.query;

  const establishmentAddresses = await establishmentAddressesController.searchByAddressName(
    query as string
  );

  return response.json(classToClass(establishmentAddresses));
});

establishmentsRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required().max(150),
      address: Joi.string().required().max(300),
      number: Joi.string().allow(null, "").max(10),
      district: Joi.string().required().max(100),
      city: Joi.string().required().max(100),
      state: Joi.string().required().max(100),
      country: Joi.string().required().max(100),
    },
  }),
  async (request, response) => {
    const {
      name,
      address,
      number,
      district,
      city,
      state,
      country,
    } = request.body;

    const establishmentAddresses = await establishmentAddressesController.create(
      {
        name,
        address: {
          address,
          number,
          district,
          city,
          state,
          country,
        },
      }
    );

    return response.json(classToClass(establishmentAddresses));
  }
);

establishmentsRouter.put(
  "/:addressId",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required().max(150),
      address: Joi.string().required().max(300),
      number: Joi.string().allow(null, "").max(10),
      district: Joi.string().required().max(100),
      city: Joi.string().required().max(100),
      state: Joi.string().required().max(100),
      country: Joi.string().required().max(100),
    },
  }),
  async (request, response) => {
    const {
      name,
      address,
      number,
      district,
      city,
      state,
      country,
    } = request.body;

    const { addressId } = request.params;

    const data = {
      address,
      number,
      district,
      city,
      state,
      country,
    };

    const establishmentAddresses = await establishmentAddressesController.update(
      {
        name,
        addressId,
        address: data,
      }
    );

    return response.json(classToClass(establishmentAddresses));
  }
);

establishmentsRouter.delete("/:addresseId", async (request, response) => {
  const { addresseId } = request.params;

  await establishmentAddressesController.delete(addresseId);

  return response.send();
});

export default establishmentsRouter;
