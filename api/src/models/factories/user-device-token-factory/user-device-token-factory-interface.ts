import { IUserDeviceToken } from "../../user-device-token/user-device-token-interface";

export interface IUserDeviceTokenFactory {
    create(userId: string, deviceToken: string): IUserDeviceToken;
}

export const IUserDeviceTokenFactory = Symbol.for("IUserDeviceTokenFactory");