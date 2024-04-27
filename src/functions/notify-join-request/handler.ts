import { container } from '../../di/inversify.config';
import { IMessageQueueClient } from '@splitsies/utils';
import { IExpenseDto, IQueueMessage, IUserDto } from '@splitsies/shared-models';
import { INotificationService } from '../../services/notification-service/notification-service-interface';
import { DynamoDBStreamHandler } from 'aws-lambda';
import { AttributeValue } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";

const notificationService = container.get<INotificationService>(INotificationService);
const messageQueueClient = container.get<IMessageQueueClient>(IMessageQueueClient);

type Message = {
    userId: string;
    expense: IExpenseDto;
    requestingUser: IUserDto;
}

export const main: DynamoDBStreamHandler = async (event, _, callback) => {
    const promises: Promise<void>[] = [];
    const messages: IQueueMessage<Message>[] = [];

    for (const record of event.Records) {
        if (!record.dynamodb?.NewImage) continue;

        const message = unmarshall(record.dynamodb.NewImage as Record<string, AttributeValue>) as IQueueMessage<Message>;
        messages.push(message);

        if (Date.now() > message.ttl) continue;

        const { userId, expense, requestingUser } = message.data;
        promises.push(notificationService.sendNotificationToUsers([userId], `${requestingUser.givenName} invites you to join ${expense.name}`, "Tap to join"));
    }

    promises.push(messageQueueClient.deleteBatch(messages));
    await Promise.all(promises);
    callback(null);
};