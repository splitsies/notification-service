import "reflect-metadata"
import { Container } from "inversify";
import { IDbConfiguration } from "../models/configuration/db/db-configuration-interface";
import { DbConfiguration } from "../models/configuration/db/db-configuration";
import { FirebaseConfiguration, IFirebaseConfiguration, ILogger, IMessageQueueClient, Logger } from "@splitsies/utils";
import { UserDeviceTokenDao } from "../dao/user-device-token-dao/user-device-token-dao";
import { IUserDeviceTokenDao } from "../dao/user-device-token-dao/user-device-token-dao-interface";
import { UserDeviceTokenService } from "../services/user-device-token-service/user-device-token-service";
import { IUserDeviceTokenService } from "../services/user-device-token-service/user-device-token-service-interface";
import { ITokenConfiguration } from "../models/configuration/token/token-configuration-interface";
import { TokenConfiguration } from "../models/configuration/token/token-configuration";
import { IUserDeviceTokenFactory } from "../models/factories/user-device-token-factory/user-device-token-factory-interface";
import { UserDeviceTokenFactory } from "../models/factories/user-device-token-factory/user-device-token-factory";
import { INotificationClientProvider } from "../providers/notification-client-provider/notification-client-provider-interface";
import { NotificationClientProvider } from "../providers/notification-client-provider/notification-client-provider";
import { INotificationService } from "../services/notification-service/notification-service-interface";
import { NotificationService } from "../services/notification-service/notification-service";

const container = new Container();

if (!process.env.FIREBASE_AUTH_EMULATOR_HOST) {
    container.bind<IMessageQueueClient>(IMessageQueueClient);
}

// FCM is not supported in emulator, make sure we connect to the live stage
delete process.env["FIREBASE_AUTH_EMULATOR_HOST"];

container.bind<IDbConfiguration>(IDbConfiguration).to(DbConfiguration).inSingletonScope();
container.bind<IFirebaseConfiguration>(IFirebaseConfiguration).to(FirebaseConfiguration).inSingletonScope();
container.bind<ITokenConfiguration>(ITokenConfiguration).to(TokenConfiguration).inSingletonScope();
container.bind<INotificationClientProvider>(INotificationClientProvider).to(NotificationClientProvider).inSingletonScope();
container.bind<ILogger>(ILogger).to(Logger).inSingletonScope();
container.bind<IUserDeviceTokenDao>(IUserDeviceTokenDao).to(UserDeviceTokenDao).inSingletonScope();
container.bind<INotificationService>(INotificationService).to(NotificationService).inSingletonScope();
container.bind<IUserDeviceTokenService>(IUserDeviceTokenService).to(UserDeviceTokenService).inSingletonScope();
container.bind<IUserDeviceTokenFactory>(IUserDeviceTokenFactory).to(UserDeviceTokenFactory).inSingletonScope();

export { container };
