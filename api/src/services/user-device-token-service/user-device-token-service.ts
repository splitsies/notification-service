import { inject, injectable } from "inversify";
import { IUserDeviceTokenDao } from "../../dao/user-device-token-dao/user-device-token-dao-interface";
import { IUserDeviceToken } from "../../models/user-device-token/user-device-token-interface";
import { IUserDeviceTokenService } from "./user-device-token-service-interface";
import { IUserDeviceTokenFactory } from "../../models/factories/user-device-token-factory/user-device-token-factory-interface";
import { IUserDeviceTokenRequest } from "../../models/user-device-token-request/user-device-token-request-interface";
import { InvalidArgumentsError } from "@splitsies/shared-models";

@injectable()
export class UserDeviceTokenService implements IUserDeviceTokenService {

    constructor(
        @inject(IUserDeviceTokenDao) private readonly _dao: IUserDeviceTokenDao,
        @inject(IUserDeviceTokenFactory) private readonly _tokenFactory: IUserDeviceTokenFactory) { }
    
    async update(params: { newToken?: IUserDeviceTokenRequest, oldToken?: IUserDeviceTokenRequest }): Promise<void> {        
        if (!params.oldToken && !params.newToken) { throw new InvalidArgumentsError(); }
        if (params.oldToken) {
            await this.delete(params.oldToken.userId, params.oldToken.deviceToken);
        }

        if (params.newToken) {
            await this.add(params.newToken.userId, params.newToken.deviceToken);
        }
    }

    private add(userId: string, deviceToken: string): Promise<IUserDeviceToken> {
        const token = this._tokenFactory.create(userId, deviceToken);
        return this._dao.create(token);
    }

    private delete(userId: string, deviceToken: string): Promise<void> {
        return this._dao.delete({ userId, deviceToken });
    }
}