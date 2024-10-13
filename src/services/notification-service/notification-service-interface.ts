import { IExpenseDto, IUserDto } from "@splitsies/shared-models";

export interface INotificationService {
    notifyJoinRequest(userId: string, expense: IExpenseDto, requestingUser: IUserDto): Promise<void>;
    sendNotificationToUsers(userIds: string[], title: string, body: string, data?: { type: string, [key: string]: string} ): Promise<void>;
    sendMessageToUsers(userIds: string[], data: { type: string, [key: string]: string; }): Promise<void>;
}

export const INotificationService = Symbol.for("INotificationService");