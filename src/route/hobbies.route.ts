import { Router } from "express";
import hobbiesController from "../controller/hobbies.controller";
import validationMiddleware from "../middleware/validation.middleware";
import { HobbiesRequestPayload } from "../command/request.dto";

const hobbiesRouter = Router();

hobbiesRouter.post(
  "/",
  validationMiddleware(HobbiesRequestPayload),
  hobbiesController.create
);
hobbiesRouter.get("/", hobbiesController.findAll);
hobbiesRouter.get("/:id", hobbiesController.find);
hobbiesRouter.put("/:id", hobbiesController.update);
hobbiesRouter.delete("/:id", hobbiesController.delete);

export default hobbiesRouter;
