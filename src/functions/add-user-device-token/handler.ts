import schema from "./schema"
import { container } from '../../di/inversify.config';
import { IUserDeviceTokenService } from '../../services/user-device-token-service/user-device-token-service-interface';
import { ILogger, SplitsiesFunctionHandlerFactory } from '@splitsies/utils';
import { middyfy } from '../../libs/lambda';
import { DataResponse, HttpStatusCode } from "@splitsies/shared-models";
import { IUserDeviceToken } from "../../models/user-device-token/user-device-token-interface";

const userService = container.get<IUserDeviceTokenService>(IUserDeviceTokenService);
const logger = container.get<ILogger>(ILogger);

export const main = middyfy(
    SplitsiesFunctionHandlerFactory.create<typeof schema, IUserDeviceToken>(logger, async (event) => {
    
        const { userId, deviceToken } = event.body;
        console.log(event.body.userId);
        const token = await userService.add(userId, deviceToken);
    
        return new DataResponse(HttpStatusCode.CREATED, token).toJson();
    })
);