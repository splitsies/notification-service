import { Messaging } from "firebase-admin/messaging";

export interface INotificationClientProvider {
    provide(): Messaging;
}

export const INotificationClientProvider = Symbol.for("INotificationClientProvider");
