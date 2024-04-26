
import { injectable, inject } from "inversify";
import { initializeApp } from "firebase-admin/app";
import { Messaging, getMessaging } from "firebase-admin/messaging";
import { IFirebaseConfiguration } from "@splitsies/utils";
import { INotificationClientProvider } from "./notification-client-provider-interface";

@injectable()
export class NotificationClientProvider implements INotificationClientProvider {
    private readonly messaging: Messaging;

    constructor(
        @inject(IFirebaseConfiguration) firebaseConfig: IFirebaseConfiguration,
    ) {

        const firebaseApp = initializeApp(firebaseConfig);
        this.messaging = getMessaging(firebaseApp);
    }

    provide(): Messaging {
        return this.messaging;
    }
}
