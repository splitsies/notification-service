import "reflect-metadata"
import { Container } from "inversify";
import { IDbConfiguration } from "../models/configuration/db/db-configuration-interface";
import { DbConfiguration } from "../models/configuration/db/db-configuration";
import { AdminAuthProvider } from "../providers/admin-auth-provider/admin-auth-provider";
import { FirebaseConfiguration, IAdminAuthProvider, IFirebaseConfiguration, ILogger, Logger } from "@splitsies/utils";
import { UserDeviceTokenDao } from "../dao/user-device-token-dao/user-device-token-dao";
import { IUserDeviceTokenDao } from "../dao/user-device-token-dao/user-device-token-dao-interface";
import { UserDeviceTokenService } from "../services/user-device-token-service/user-device-token-service";
import { IUserDeviceTokenService } from "../services/user-device-token-service/user-device-token-service-interface";

const container = new Container();

container.bind<IDbConfiguration>(IDbConfiguration).to(DbConfiguration);
container.bind<IFirebaseConfiguration>(IFirebaseConfiguration).to(FirebaseConfiguration);
container.bind<IAdminAuthProvider>(IAdminAuthProvider).to(AdminAuthProvider);
container.bind<ILogger>(ILogger).to(Logger);

container.bind<IUserDeviceTokenDao>(IUserDeviceTokenDao).to(UserDeviceTokenDao);
container.bind<IUserDeviceTokenService>(IUserDeviceTokenService).to(UserDeviceTokenService);

export { container };
