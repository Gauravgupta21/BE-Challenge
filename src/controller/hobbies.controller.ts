import { Request, Response, NextFunction } from "express";
import { HobbiesRequestPayload } from "../command/request.dto";
import { HobbiesService } from "../service/hoobies.service";
import { IHobbies } from "../model/hobbies.model";
import { UserService } from "../service/user.service";
import HttpException from "../error-handler/error-exception";
import { Get, Route,Tags } from "tsoa";

@Route("hobbies")
@Tags("Hobbies")
class HobbiesController {
  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const hobbiesRequestPayload: HobbiesRequestPayload = req.body;
      console.log(
        "-----hobbiesRequestDto----",
        JSON.stringify(hobbiesRequestPayload)
      );
      const hobbiesData: IHobbies = {
        name: hobbiesRequestPayload.name,
        year: hobbiesRequestPayload.year,
        passionLevel: hobbiesRequestPayload.passionLevel,
      } as IHobbies;
      const hobbiesResult = await HobbiesService.create(hobbiesData);
      UserService.addHobbies(hobbiesRequestPayload.userId, hobbiesResult._id);
      res.send(hobbiesResult);
    } catch (err) {
      next(err);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const hobbiesPayload = req.body;
      const hobbies = await HobbiesService.update(
        req.params.id,
        hobbiesPayload
      );
      res.send(hobbies);
    } catch (err) {
      next(err);
    }
  };
  @Get("/")
  public find = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const hobbies = await HobbiesService.findOne({ _id: req.params.id });
      if (!hobbies) {
        throw new HttpException(404, "Hobbies Not found");
      }
      res.send(hobbies);
    } catch (err) {
      next(err);
    }
  };
  public findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const hobbies = await HobbiesService.getList({});
      res.send(hobbies);
    } catch (err) {
      next(err);
    }
  };
  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await HobbiesService.deleteHobbiesAndUpdateUser(req.params.id);
      res.send({ message: "Hobbies deleted successfully!" });
    } catch (err) {
      next(err);
    }
  };
}
export default new HobbiesController();
