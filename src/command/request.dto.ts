import { PassionLevels } from "../enum/passion-level";
import mongoose from "mongoose";
import { IsString, IsNotEmpty, IsEnum, IsNumber,ValidateNested,Min } from "class-validator";

export class UserRequestPayload {
  @IsNotEmpty()
  @IsString()
  name!: string;
  @ValidateNested()
  hobbies!: HobbiesPayload[];
}
export class HobbiesPayload {
  @IsNotEmpty()
  @IsString()
  name!: string;
  @IsEnum(PassionLevels)
  passionLevel!: PassionLevels;
  @IsNotEmpty()
  @IsNumber()
  year!: number;
}

export class HobbiesRequestPayload extends HobbiesPayload {
  @IsNotEmpty()
  userId!: mongoose.Types.ObjectId;
}
