import "reflect-metadata"
import { Container } from "inversify";
import { FirebaseProvider, IFirebaseProvider, ILogger, Logger } from "@splitsies/utils";

const container = new Container({ defaultScope: "Singleton" });

container.bind<IFirebaseProvider>(IFirebaseProvider).to(FirebaseProvider);
container.bind<ILogger>(ILogger).to(Logger);

export { container };
