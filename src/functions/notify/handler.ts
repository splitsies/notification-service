import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { container } from '../../di/inversify.config';
// import { IAdminAuthProvider, IFirebaseConfiguration } from '@splitsies/utils';
import { IDbConfiguration } from '../../models/configuration/db/db-configuration-interface';
import { IFirebaseConfiguration } from '../../models/configuration/firebase/firebase-configuration-interface';

export const main = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    try {
        
// const adminAuthProvider = container.get<IAdminAuthProvider>(IAdminAuthProvider);
        // const config = container.get<IFirebaseConfiguration>(IFirebaseConfiguration);
        const test = container.get<IFirebaseConfiguration>(IFirebaseConfiguration);

        console.log(test);

//         console.log(adminAuthProvider);
        //         console.log(config);
        
        // console.log(config);
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
