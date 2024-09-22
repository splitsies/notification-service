export interface IUserDeviceToken {
    userId: string;
    deviceToken: string;
    ttl: number;
    createdAt: number;
}

export type Key = Pick<IUserDeviceToken, "userId" | "deviceToken">