import { DaoBase, ILogger } from "@splitsies/utils";
import { inject, injectable } from "inversify";
import { IUserDeviceToken } from "../../models/user-device-token/user-device-token-interface";
import { IDbConfiguration } from "../../models/configuration/db/db-configuration-interface";
import { QueryCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { IUserDeviceTokenDao } from "./user-device-token-dao-interface";

@injectable()
export class UserDeviceTokenDao extends DaoBase<IUserDeviceToken> implements IUserDeviceTokenDao {
    readonly key: (c: IUserDeviceToken) => Record<string, string>;

    constructor(
        @inject(ILogger) logger: ILogger,
        @inject(IDbConfiguration) private readonly dbConfiguration: IDbConfiguration,
    ) {
        const keySelector = (c: IUserDeviceToken) => ({ userId: c.userId, deviceToken: c.deviceToken });
        super(logger, dbConfiguration, dbConfiguration.tableName, keySelector);
        this.key = keySelector;
    }

    async getForUser(userId: string): Promise<string[]> {
        const result = await this._client.send(
            new QueryCommand({
                TableName: this.dbConfiguration.tableName,
                KeyConditionExpression: "#userId = :userId",
                FilterExpression: "#ttl > :now",
                ExpressionAttributeNames: {
                    "#userId": "userId",
                    "#ttl": "ttl",
                },
                ExpressionAttributeValues: {
                    ":userId": { S: userId },
                    ":now": { N: `${Date.now()}` },
                },
            }),
        );

        const userDeviceTokens = result.Items?.map(i => unmarshall(i) as IUserDeviceToken) ?? [];
        return userDeviceTokens.map(udt => udt.deviceToken);
    }
}