import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { container } from '../../di/inversify.config';
import { IUserDeviceTokenService } from '../../services/user-device-token-service/user-device-token-service-interface';
import { IUserDeviceTokenDao } from '../../dao/user-device-token-dao/user-device-token-dao-interface';
import { IDbConfiguration } from '../../models/configuration/db/db-configuration-interface';
import { IFirebaseConfiguration } from '@splitsies/utils';

const userService = container.get<IUserDeviceTokenService>(IUserDeviceTokenService);
// const dao = container.get<IUserDeviceTokenDao>(IUserDeviceTokenDao);
// const config = container.get<IFirebaseConfiguration>(IFirebaseConfiguration);

export const main = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

        
    try {
        const token = await userService.add({ userId: "1234", deviceToken: "5678", ttl: Date.now() + 100, createdAt: Date.now() });

        return {
            statusCode: 201,
            body: JSON.stringify({
                message: JSON.stringify(token),
            }),
        };
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'some error happened',
            }),
        };
    }
};
