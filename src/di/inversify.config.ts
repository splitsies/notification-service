import "reflect-metadata"
import { Container } from "inversify";
import { IDbConfiguration } from "../models/configuration/db/db-configuration-interface";
import { DbConfiguration } from "../models/configuration/db/db-configuration";
import { FirebaseProvider, IFirebaseProvider, ILogger, IMessageQueueClient, Logger, MessageQueueClient } from "@splitsies/utils";
import { UserDeviceTokenDao } from "../dao/user-device-token-dao/user-device-token-dao";
import { IUserDeviceTokenDao } from "../dao/user-device-token-dao/user-device-token-dao-interface";
import { UserDeviceTokenService } from "../services/user-device-token-service/user-device-token-service";
import { IUserDeviceTokenService } from "../services/user-device-token-service/user-device-token-service-interface";
import { ITokenConfiguration } from "../models/configuration/token/token-configuration-interface";
import { TokenConfiguration } from "../models/configuration/token/token-configuration";
import { IUserDeviceTokenFactory } from "../models/factories/user-device-token-factory/user-device-token-factory-interface";
import { UserDeviceTokenFactory } from "../models/factories/user-device-token-factory/user-device-token-factory";
import { INotificationService } from "../services/notification-service/notification-service-interface";
import { NotificationService } from "../services/notification-service/notification-service";

const container = new Container({ defaultScope: "Singleton" });

// FCM is not supported in emulator, make sure we connect to the live stage
delete process.env["FIREBASE_AUTH_EMULATOR_HOST"];

container.bind<IMessageQueueClient>(IMessageQueueClient).to(MessageQueueClient);
container.bind<IDbConfiguration>(IDbConfiguration).to(DbConfiguration);
container.bind<ITokenConfiguration>(ITokenConfiguration).to(TokenConfiguration);
container.bind<IFirebaseProvider>(IFirebaseProvider).to(FirebaseProvider);
container.bind<ILogger>(ILogger).to(Logger);
container.bind<IUserDeviceTokenDao>(IUserDeviceTokenDao).to(UserDeviceTokenDao);
container.bind<INotificationService>(INotificationService).to(NotificationService);
container.bind<IUserDeviceTokenService>(IUserDeviceTokenService).to(UserDeviceTokenService);
container.bind<IUserDeviceTokenFactory>(IUserDeviceTokenFactory).to(UserDeviceTokenFactory);

export { container };
