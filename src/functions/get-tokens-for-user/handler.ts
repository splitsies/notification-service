import { container } from '../../di/inversify.config';
import { IUserDeviceTokenService } from '../../services/user-device-token-service/user-device-token-service-interface';
import { ILogger, SplitsiesFunctionHandlerFactory } from '@splitsies/utils';
import { DataResponse, HttpStatusCode } from '@splitsies/shared-models';
import { middyfy } from '../../libs/lambda';

const userService = container.get<IUserDeviceTokenService>(IUserDeviceTokenService);
const logger = container.get<ILogger>(ILogger);

export const main = middyfy(
    SplitsiesFunctionHandlerFactory.create<never, string[]>(logger, async (event) => {    
        const tokens = await userService.getForUser(event.pathParameters.userId);    
        return new DataResponse(HttpStatusCode.OK, tokens).toJson();
    })
);
