import Hobbies, { IHobbies } from "../model/hobbies.model";
import { FilterQuery } from "mongoose";
import mongoose from "mongoose";
import { UserService } from "./user.service";
import HttpException from "../error-handler/error-exception";
import { runInTransaction } from "mongoose-transact-utils";

const conn = mongoose.connection;
export class HobbiesService {
  public static create = async (
    newHobbies: IHobbies,
    session: any = null
  ): Promise<IHobbies> => {
    const hobbies = new Hobbies(newHobbies);
    return hobbies.save({ session });
  };

  public static update = async (
    hobbiesId: string,
    hobbiesData: IHobbies
  ): Promise<IHobbies | null> => {
    return Hobbies.findOneAndUpdate({ _id: hobbiesId }, hobbiesData, {
      new: true,
    });
  };

  public static findOne = async (
    query: FilterQuery<IHobbies>
  ): Promise<IHobbies | null> => {
    return Hobbies.findOne(query).lean();
  };

  public static getList = async (
    query: FilterQuery<IHobbies>
  ): Promise<IHobbies | null> => {
    return Hobbies.find(query).lean();
  };

  public static deleteHobbies = async (
    hobbiesId: string,
    session: any
  ): Promise<void> => {
    const result = await Hobbies.deleteOne(
      { _id: mongoose.Types.ObjectId(hobbiesId) },
      { session }
    );
    if (result && result.deletedCount === 0) {
      throw new HttpException(404, "Hobbies not found");
    }
  };

  public static deleteManyHobbies = async (
    hobbiesIds: mongoose.Types.ObjectId[],
    session: any
  ): Promise<void> => {
    console.log("In hobbiesIds:::",hobbiesIds)
    const result = await Hobbies.deleteMany(
      { _id: { $in: hobbiesIds } },
      { session }
    );
    console.log("Hobbes result.deletedCount:::", result.deletedCount);
    if (result && result.deletedCount === 0) {
      throw new HttpException(404, "Hobbies not found");
    }
  };
  public static deleteHobbiesAndUpdateUser = async (
    hobbiesId: string
  ): Promise<void> => {
    return await runInTransaction(async (session) => {
      await HobbiesService.deleteHobbies(hobbiesId, session);
      await UserService.removeHobbiesFromUser(hobbiesId, session);
    });
  };
}
