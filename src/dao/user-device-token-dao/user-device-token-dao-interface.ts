import { IDao } from "@splitsies/utils";
import { IUserDeviceToken } from "../../models/user-device-token/user-device-token-interface";

export interface IUserDeviceTokenDao extends IDao<IUserDeviceToken> { 
    getForUser(userId: string): Promise<string[]>;
}

export const IUserDeviceTokenDao = Symbol.for("IUserDeviceTokenDao");