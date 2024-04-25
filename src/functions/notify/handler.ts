import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { container } from '../../di/inversify.config';
import { IAdminAuthProvider } from '@splitsies/utils';
import { IFirebaseConfiguration } from '@splitsies/shared-models';

const adminAuthProvider = container.get<IAdminAuthProvider>(IAdminAuthProvider);
const config = container.get<IFirebaseConfiguration>(IFirebaseConfiguration);

export const main = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    try {
        console.log(adminAuthProvider);
        console.log(config);
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: process.env.FIREBASE_API_KEY,
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
