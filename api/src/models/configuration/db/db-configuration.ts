import { assert } from "console";
import { IDbConfiguration } from "./db-configuration-interface";
import { injectable } from "inversify";

@injectable()
export class DbConfiguration implements IDbConfiguration {
    readonly dbRegion: string;
    readonly tableName: string;
    readonly endpoint: string;
    readonly dbIndexName: string;

    constructor() {
        assert(!!process.env.dbRegion, "DbRegion was undefined");
        assert(!!process.env.dbTableName, "DbEndpoint was undefined");
        assert(!!process.env.dbEndpoint, "DbTableName was undefined");
        assert(!!process.env.dbIndexName, "DbIndexName was undefined");


        this.dbRegion = process.env.dbRegion;
        this.tableName = this.formatResourceName(process.env.dbTableName);
        this.endpoint = process.env.dbEndpoint;
        this.dbIndexName = this.formatResourceName(process.env.dbIndexName, process.env.dbTableName);
    }

    private formatResourceName(resourceName: string, associatedTableName: string = undefined): string {
        if (process.env.AwsAccountId !== process.env.ResourceAccountId) {
            return associatedTableName === undefined
                ? `arn:aws:dynamodb:${process.env.dbRegion}:${process.env.ResourceAccountId}:table/${resourceName}`
                : `arn:aws:dynamodb:${process.env.dbRegion}:${process.env.ResourceAccountId}:table/${associatedTableName}/index/${resourceName}`;
        }

        return resourceName;
    }
}
