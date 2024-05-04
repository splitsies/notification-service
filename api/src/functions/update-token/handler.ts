import schema from "./schema"
import { container } from '../../di/inversify.config';
import { IUserDeviceTokenService } from '../../services/user-device-token-service/user-device-token-service-interface';
import { ExpectedError, ILogger, SplitsiesFunctionHandlerFactory } from '@splitsies/utils';
import { middyfy } from '../../libs/lambda';
import { DataResponse, HttpStatusCode } from "@splitsies/shared-models";

const userService = container.get<IUserDeviceTokenService>(IUserDeviceTokenService);
const logger = container.get<ILogger>(ILogger);

class InvalidArgumentsError extends Error { }

export const main = middyfy(
    SplitsiesFunctionHandlerFactory.create<typeof schema, void>(logger, async (event) => {
        const { oldToken, newToken } = event.body;
        await userService.update({ oldToken, newToken });
        return new DataResponse(HttpStatusCode.OK, null).toJson();
    }, [new ExpectedError(InvalidArgumentsError, HttpStatusCode.BAD_REQUEST, "At least one token is required")])
);