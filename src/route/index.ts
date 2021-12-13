import { Router,Request,Response } from "express";
import userRouter from "./user.route";
import hobbiesRouter from './hobbies.route';
const apiRouter = Router();
const healthChcek = async (req: Request, res: Response) => { res.sendStatus(200) };
apiRouter.use("/healthChcek", healthChcek);

apiRouter.use("/user", userRouter);
apiRouter.use("/hobbies", hobbiesRouter);

export default apiRouter;
