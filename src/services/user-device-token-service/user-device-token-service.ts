import { inject, injectable } from "inversify";
import { IUserDeviceTokenDao } from "../../dao/user-device-token-dao/user-device-token-dao-interface";
import { IUserDeviceToken } from "../../models/user-device-token/user-device-token-interface";
import { IUserDeviceTokenService } from "./user-device-token-service-interface";
import { IUserDeviceTokenFactory } from "../../models/factories/user-device-token-factory/user-device-token-factory-interface";

@injectable()
export class UserDeviceTokenService implements IUserDeviceTokenService {

    constructor(@inject(IUserDeviceTokenDao) private readonly _dao: IUserDeviceTokenDao,
    @inject(IUserDeviceTokenFactory) private readonly _tokenFactory: IUserDeviceTokenFactory) { }

    add(userId: string, deviceToken: string): Promise<IUserDeviceToken> {
        const token = this._tokenFactory.create(userId, deviceToken);
        return this._dao.create(token);
    }

    delete(record: IUserDeviceToken): Promise<void> {
        return this._dao.delete(this._dao.key(record));
    }   

    getForUser(userId: string): Promise<string[]> {
        return this._dao.getForUser(userId);
    }

    async update(oldToken: IUserDeviceToken, newUserId: string, newToken: string): Promise<IUserDeviceToken> {
        await this.delete(oldToken);
        return this.add(newUserId, newToken);
    }
}