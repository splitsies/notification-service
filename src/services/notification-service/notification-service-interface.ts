export interface INotificationService {
    sendNotificationToUsers(userIds: string[], title: string, body: string, data?: { type: string, [key: string]: string} ): Promise<void>;
    sendMessageToUsers(userIds: string[], data: { type: string, [key: string]: string; }): Promise<void>;
}

export const INotificationService = Symbol.for("INotificationService");