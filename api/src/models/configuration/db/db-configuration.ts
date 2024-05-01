import { assert } from "console";
import { IDbConfiguration } from "./db-configuration-interface";
import { injectable } from "inversify";

@injectable()
export class DbConfiguration implements IDbConfiguration {
    readonly dbAccessKeyId: string;
    readonly dbSecretAccessKey: string;
    readonly dbRegion: string;
    readonly tableName: string;
    readonly endpoint: string;

    constructor() {
        assert(!!process.env.dbAccessKeyId, "DbAccessKeyId was undefined");
        assert(!!process.env.dbSecretAccessKey, "DbSecretAccessKey was undefined");
        assert(!!process.env.dbRegion, "DbRegion was undefined");
        assert(!!process.env.dbTableName, "DbEndpoint was undefined");
        assert(!!process.env.dbEndpoint, "DbTableName was undefined");

        this.dbAccessKeyId = process.env.dbAccessKeyId;
        this.dbSecretAccessKey = process.env.dbSecretAccessKey;
        this.dbRegion = process.env.dbRegion;
        this.tableName = process.env.dbTableName;
        this.endpoint = process.env.dbEndpoint;
    }
}
