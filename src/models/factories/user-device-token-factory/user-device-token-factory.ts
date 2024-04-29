import { inject, injectable } from "inversify";
import { IUserDeviceTokenFactory } from "./user-device-token-factory-interface";
import { IUserDeviceToken } from "../../user-device-token/user-device-token-interface";
import { ITokenConfiguration } from "../../configuration/token/token-configuration-interface";

@injectable()
export class UserDeviceTokenFactory implements IUserDeviceTokenFactory {

    constructor(@inject(ITokenConfiguration) private readonly _tokenConfiguration: ITokenConfiguration) {}


    create(userId: string, deviceToken: string): IUserDeviceToken {
        const createdAt = Date.now();
        const now = new Date(createdAt);
        const ttl = now.setDate(now.getDate() + this._tokenConfiguration.ttlDays);

        return {
            userId,
            deviceToken,
            ttl,
            createdAt
        };
    }
    
}