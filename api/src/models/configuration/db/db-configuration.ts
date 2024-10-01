import { assert } from "console";
import { IDbConfiguration } from "./db-configuration-interface";
import { injectable } from "inversify";

@injectable()
export class DbConfiguration implements IDbConfiguration {
    readonly dbRegion: string;
    readonly tableName: string;
    readonly endpoint: string;
    readonly dbIndexName: string;
    readonly dbAccessKeyId: string;
    readonly dbSecretAccessKey: string;

    constructor() {
        assert(!!process.env.dbRegion, "DbRegion was undefined");
        assert(!!process.env.dbTableName, "DbEndpoint was undefined");
        assert(!!process.env.dbEndpoint, "DbTableName was undefined");
        assert(!!process.env.dbIndexName, "DbIndexName was undefined");


        this.dbRegion = process.env.dbRegion;
        this.tableName = this.formatResourceName(process.env.dbTableName);
        this.endpoint = process.env.dbEndpoint;
        this.dbIndexName = process.env.dbIndexName;
        this.dbAccessKeyId = process.env.dbAccessKeyId;
        this.dbSecretAccessKey = process.env.dbSecretAccessKey;
    }

    private formatResourceName(resourceName: string,): string {
        return process.env.AwsAccountId !== process.env.ResourceAccountId
            ? `arn:aws:dynamodb:${process.env.dbRegion}:${process.env.ResourceAccountId}:table/${resourceName}`
            : resourceName;
    }
}
