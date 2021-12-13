import { Request, Response, NextFunction } from "express";
import { UserService } from "../service/user.service";
import { UserRequestPayload } from "../command/request.dto";

class UserController {
  // #MONGO="mongodb://localhost:27017,localhost:27018,localhost:27019/arriveDb?replicaSet=rs"

  public create = async (req: Request, res: Response, next: NextFunction) => {
    const userRequestPayload: UserRequestPayload = req.body;
    try {
      const user = await UserService.createUserAndHobbies(userRequestPayload);
      res.send(user);
    } catch (err) {
      next(err);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userRequest = req.body;
      const result = await UserService.update(req.params.id, userRequest);
      res.send(result);
    } catch (err) {
      next(err);
    }
  };
  public find = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await UserService.findOne({ _id: req.params.id });
      res.send(result);
    } catch (err) {
      next(err);
    }
  };
  public findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await UserService.getList({});
      res.send(result);
    } catch (err) {
      next(err);
    }
  };
  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await UserService.deleteUser(req.params.id);
      res.send({ message: "User deleted successfully!" });
    } catch (err) {
      next(err);
    }
  };
}
export default new UserController();
