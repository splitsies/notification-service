import { inject, injectable } from "inversify";
import { IUserDeviceTokenDao } from "../../dao/user-device-token-dao/user-device-token-dao-interface";
import { IUserDeviceToken } from "../../models/user-device-token/user-device-token-interface";
import { IUserDeviceTokenService } from "./user-device-token-service-interface";

@injectable()
export class UserDeviceTokenService implements IUserDeviceTokenService {

    constructor(@inject(IUserDeviceTokenDao) private readonly _dao: IUserDeviceTokenDao) { }

    add(record: IUserDeviceToken): Promise<IUserDeviceToken> {
        return this._dao.create(record);
    }

    delete(record: IUserDeviceToken): Promise<void> {
        return this._dao.delete(this._dao.key(record));
    }   

    getForUser(userId: string): Promise<string[]> {
        return this._dao.getForUser(userId);
    }

    async update(oldToken: IUserDeviceToken, newToken: IUserDeviceToken): Promise<IUserDeviceToken> {
        await this.delete(oldToken);
        return this.add(newToken);
    }
}