import { inject, injectable } from "inversify";
import { IUserDeviceTokenDao } from "../../dao/user-device-token-dao/user-device-token-dao-interface";
import { INotificationService } from "./notification-service-interface";
import { IFirebaseProvider } from "@splitsies/utils";
import { IExpenseDto, IUserDto } from "@splitsies/shared-models";
import { Message, TokenMessage } from "firebase-admin/messaging";

@injectable()
export class NotificationService implements INotificationService {
    constructor(
        @inject(IFirebaseProvider) private readonly _firebaseProvider: IFirebaseProvider,
        @inject(IUserDeviceTokenDao) private readonly _userDeviceTokenDao: IUserDeviceTokenDao,
    ) { }

    async notifyJoinRequest(userId: string, expense: IExpenseDto, requestingUser: IUserDto): Promise<void> {        
        await this.sendNotificationToUsers(
            [userId],
            "Splitsies",
            `${requestingUser.givenName} is inviting you to join ${expense.name}`,
            { type: "0", expenseId: expense.id, requestingUserId: requestingUser.id }
        );
    }

    async sendNotificationToUsers(userIds: string[], title: string, body: string, data: { type: string, [key: string]: string; } = { type: "none" }): Promise<void> {
        const messages = (await Promise.all(userIds.map(userId => this._userDeviceTokenDao.getForUser(userId))))
            .reduce((ids, set) => [...ids, ...set], [])
            .map(token => ({
                data,
                notification: {
                    title, body,
                },
                android: {
                    priority: "high",
                    notification: {
                        title, body,
                        priority: "high",
                        channelId: "priority_notification"

                    }
                },
                apns: {
                    payload: {
                        aps: {
                            title, body,
                            sound: "default"
                        }
                    }
                },
                token
            } as TokenMessage));
        
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