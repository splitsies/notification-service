import { inject, injectable } from "inversify";
import { INotificationClientProvider } from "../../providers/notification-client-provider/notification-client-provider-interface";
import { IUserDeviceTokenDao } from "../../dao/user-device-token-dao/user-device-token-dao-interface";
import { INotificationService } from "./notification-service-interface";

@injectable()
export class NotificationService implements INotificationService {
    constructor(
        @inject(INotificationClientProvider) private readonly _notificationClientProvider: INotificationClientProvider,
        @inject(IUserDeviceTokenDao) private readonly _userDeviceTokenDao: IUserDeviceTokenDao,
    ) { }

    async sendNotificationToUser(userId: string, title: string, body: string): Promise<void> {
        const tokens = await this._userDeviceTokenDao.getForUser(userId);
        if (!tokens.length) return;

        const messages = tokens.map(token => ({ notification: { title, body }, token, }));
        const client = this._notificationClientProvider.provide();
        await client.sendEach(messages);
    }

    async sendMessageToUser(userId: string, data: { [key: string]: string; }): Promise<void> {
        const tokens = await this._userDeviceTokenDao.getForUser(userId);
        if (!tokens.length) return;

        const messages = tokens.map(token => ({ data, token }));
        const client = this._notificationClientProvider.provide();
        await client.sendEach(messages);
    }
}