import { UserResponse, UserModelObject } from "../types/user";
import jwt from "jsonwebtoken";
import UserModel from '../models/user';

export class UserService {
  public static async getUser(userId: number): Promise<UserResponse> {
    const currentUser = await UserModel.findOne({ id: userId }).exec() as Partial<UserModelObject>;

    if (!currentUser) {
      throw {
        status: 404,
        message: "User not found",
      };
    }

    let response: UserResponse = {
      id: currentUser.id as number,
      email: currentUser.email as string,
    }

    if (currentUser.created_at && currentUser.updated_at) {
      response = {
        ...response,
        createdAt: new Date(parseInt(currentUser.created_at)).toISOString(),
        updatedAt: new Date(parseInt(currentUser.updated_at)).toISOString(),
      }
    }

    return response;
  }
}
