import { IUserDeviceToken } from "../../models/user-device-token/user-device-token-interface";

export interface IUserDeviceTokenService {
    add(userId: string, deviceToken: string): Promise<IUserDeviceToken>;

    delete (record: IUserDeviceToken): Promise<void>;

    getForUser(userId: string): Promise<string[]>;

    update(oldToken: IUserDeviceToken, newUserId: string, newToken: string): Promise<IUserDeviceToken>;
}

export const IUserDeviceTokenService = Symbol.for("IUserDeviceTokenService");