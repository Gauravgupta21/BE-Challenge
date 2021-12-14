import { IUser } from "../model/user.model";
import User from "../model/user.model";
import mongoose from "mongoose";
import { FilterQuery } from "mongoose";
import { UserRequestPayload, HobbiesPayload } from "../command/request.dto";
import { HobbiesService } from "./hoobies.service";
import { IHobbies } from "../model/hobbies.model";
import { runInTransaction } from "mongoose-transact-utils";
import HttpException from "../error-handler/error-exception";

export class UserService {
  public static create = async (
    newUser: IUser,
    session: any = null
  ): Promise<IUser> => {
    const user = new User(newUser);
    return user.save({ session });
  };

  public static createUserAndHobbies = async (
    userRequestPayload: UserRequestPayload
  ): Promise<IUser> => {
    const hobbies = userRequestPayload.hobbies;
    let hobbiesId: mongoose.Types.ObjectId[] = [];

    return await runInTransaction(async (session) => {
      if (Array.isArray(hobbies) && hobbies.length) {
        await Promise.all(
          hobbies.map(async (hobbie: HobbiesPayload) => {
            const hobbyResult = await HobbiesService.create(
              hobbie as IHobbies,
              session
            );
            console.log("Hobby created::", hobbyResult);
            hobbiesId.push(hobbyResult._id);
          })
        );
      }

      const userData = {
        name: userRequestPayload.name,
        hobbies: hobbiesId,
      } as IUser;
      console.log("------------userData----------------", userData);
      let user = await UserService.create(userData, session);
      return user;
    });
  };
  public static addHobbies = async (
    userId: mongoose.Types.ObjectId,
    hobbiesId: mongoose.Types.ObjectId
  ): Promise<void> => {
    await User.updateOne(
      {
        _id: userId,
      },
      {
        $push: {
          hobbies: hobbiesId,
        },
      }
    );
  };
  public static removeHobbiesFromUser = async (
    hobbiesId: string,
    session: any
  ): Promise<void> => {
    await User.updateOne(
      { hobbies: mongoose.Types.ObjectId(hobbiesId) },
      {
        $pull: {
          hobbies: hobbiesId,
        },
      },
      { session }
    );
  };

  public static update = async (
    userId: string,
    userData: IUser
  ): Promise<IUser | null> => {
    return User.findOneAndUpdate({ _id: userId }, userData, { new: true });
  };

  public static findOne = async (
    query: FilterQuery<IUser>
  ): Promise<IUser | null> => {
    return User.findOne(query).lean();
  };

  public static getList = async (
    query: FilterQuery<IUser>
  ): Promise<IUser | null> => {
    return User.find(query).lean();
  };

  public static deleteUser = async (userId: string): Promise<void> => {
    return await runInTransaction(async (session) => {
      const result = await UserService.findOne({ _id: userId });
      if (!result) {
        throw new HttpException(404, "User not found");
      } else {
        let hobbiesIds = result.hobbies;
        if (hobbiesIds) {
          await HobbiesService.deleteManyHobbies(hobbiesIds, session);
          await UserService.delete(userId, session);
        }
      }

    });
  };

  public static delete = async (
    userId: string,
    session: any
  ): Promise<void> => {
    const result = await User.deleteOne(
      { _id: mongoose.Types.ObjectId(userId) },
      { session }
    );
    if (result && result.deletedCount === 0) {
      throw new HttpException(404, "User not found");
    }
  };
}
