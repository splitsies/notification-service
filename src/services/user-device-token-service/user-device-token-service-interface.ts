import { IUserDeviceToken } from "../../models/user-device-token/user-device-token-interface";

export interface IUserDeviceTokenService {
    add(record: IUserDeviceToken): Promise<IUserDeviceToken>;

    delete (record: IUserDeviceToken): Promise<void>;

    getForUser(userId: string): Promise<string[]>;

    update(oldToken: IUserDeviceToken, newToken: IUserDeviceToken): Promise<IUserDeviceToken>;
}

export const IUserDeviceTokenService = Symbol.for("IUserDeviceTokenService");