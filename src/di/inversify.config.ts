import "reflect-metadata"
import { Container } from "inversify";
import { AdminAuthProvider, FirebaseConfiguration, IAdminAuthProvider, IFirebaseConfiguration, ILogger, Logger } from "@splitsies/utils";
import { IDbConfiguration } from "../models/configuration/db/db-configuration-interface";
import { DbConfiguration } from "../models/configuration/db/db-configuration";
import { IUserDeviceTokenDao } from "../dao/user-device-token-dao/user-device-token-dao-interface";
import { UserDeviceTokenDao } from "../dao/user-device-token-dao/user-device-token-dao";

const container = new Container();

container.bind<IDbConfiguration>(IDbConfiguration).to(DbConfiguration);
container.bind<IFirebaseConfiguration>(IFirebaseConfiguration).to(FirebaseConfiguration);
container.bind<IAdminAuthProvider>(IAdminAuthProvider).to(AdminAuthProvider);
container.bind<ILogger>(ILogger).to(Logger);

container.bind<IUserDeviceTokenDao>(IUserDeviceTokenDao).to(UserDeviceTokenDao);

export { container };
