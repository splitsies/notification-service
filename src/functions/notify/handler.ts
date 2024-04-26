import { container } from '../../di/inversify.config';
import { ILogger, SplitsiesFunctionHandlerFactory } from '@splitsies/utils';
import { DataResponse, HttpStatusCode } from '@splitsies/shared-models';
import { middyfy } from '../../libs/lambda';
import { IUserDeviceTokenService } from '../../services/user-device-token-service/user-device-token-service-interface';
import { INotificationClientProvider } from '../../providers/notification-client-provider/notification-client-provider-interface';
import { Message } from 'firebase-admin/messaging';

const logger = container.get<ILogger>(ILogger);
const notificationClient = container.get<INotificationClientProvider>(INotificationClientProvider).provide();
const userService = container.get<IUserDeviceTokenService>(IUserDeviceTokenService);

export const main = middyfy(
    SplitsiesFunctionHandlerFactory.create<never, any>(logger, async (event) => {
        const tokens = await userService.getForUser("hmeHl2DDFgc9ngSRf0BR4RM8ggh1");
        console.log({ tokens });

        const message: Message = {
            notification: {
                title: "Testing the Push",
                body: "Just do it"
            },
            token: tokens[0]
          };

        console.log("sending.......");
        await notificationClient.send(message);
    
        return new DataResponse(HttpStatusCode.OK, tokens).toJson();
    }
));