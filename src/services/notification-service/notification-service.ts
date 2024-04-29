import { inject, injectable } from "inversify";
import { IUserDeviceTokenDao } from "../../dao/user-device-token-dao/user-device-token-dao-interface";
import { INotificationService } from "./notification-service-interface";
import { IFirebaseProvider } from "@splitsies/utils";

@injectable()
export class NotificationService implements INotificationService {
    constructor(
        @inject(IFirebaseProvider) private readonly _firebaseProvider: IFirebaseProvider,
        @inject(IUserDeviceTokenDao) private readonly _userDeviceTokenDao: IUserDeviceTokenDao,
    ) { }

    async sendNotificationToUsers(userIds: string[], title: string, body: string, data: { type: string, [key: string]: string; } = { type: "none" }): Promise<void> {
        const messages = (await Promise.all(userIds.map(userId => this._userDeviceTokenDao.getForUser(userId))))
            .reduce((ids, set) => [...ids, ...set], [])
            .map(token => ({ data, notification: { title, body }, token, }));
        
        if (!messages.length) return;

        const client = this._firebaseProvider.provideMessaging();
        await client.sendEach(messages);
    }

    async sendMessageToUsers(userIds: string[], data: { type: string, [key: string]: string; }): Promise<void> {
        const messages = (await Promise.all(userIds.map(userId => this._userDeviceTokenDao.getForUser(userId))))
            .reduce((ids, set) => [...ids, ...set], [])
            .map(token => ({ data, token }));
        
        if (!messages.length) return;

        const client = this._firebaseProvider.provideMessaging();
        await client.sendEach(messages);
    }
}