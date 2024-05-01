import "reflect-metadata";
import { AuthTokenValidatorFactory } from "@splitsies/utils";
import { container } from "./inversify.config";

export const main = AuthTokenValidatorFactory.create(container);
