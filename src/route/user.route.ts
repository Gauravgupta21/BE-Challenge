import { Router } from "express";
import userController from "../controller/user.controller";
import validationMiddleware from "../middleware/validation.middleware";
import { UserRequestPayload } from "../command/request.dto";

const userRouter = Router();

userRouter.post(
  "/",
  validationMiddleware(UserRequestPayload),
  userController.create
);
userRouter.get("/:id", userController.find);
userRouter.get("/", userController.findAll);
userRouter.put("/:id", userController.update);
userRouter.delete("/:id", userController.create);

export default userRouter;
