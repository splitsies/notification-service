export interface INotificationService {
    sendNotificationToUser(userId: string, title: string, body: string): Promise<void>;
    sendMessageToUser(userId: string, data: { [key: string]: string; }): Promise<void>;
}

export const INotificationService = Symbol.for("INotificationService");