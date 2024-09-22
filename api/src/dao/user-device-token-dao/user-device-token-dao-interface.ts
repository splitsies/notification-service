import { IDao } from "@splitsies/utils";
import { IUserDeviceToken, Key } from "../../models/user-device-token/user-device-token-interface";

export interface IUserDeviceTokenDao extends IDao<IUserDeviceToken, Key> { 
    key: (c: IUserDeviceToken) => Record<string, string>;
    getForUser(userId: string): Promise<string[]>;
    getForDeviceToken(deviceToken: string): Promise<IUserDeviceToken[]>;
}

export const IUserDeviceTokenDao = Symbol.for("IUserDeviceTokenDao");