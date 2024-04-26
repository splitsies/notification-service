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
        assert(!!process.env.DB_ACCESS_KEY_ID, "DB_ACCESS_KEY_ID was undefined");
        assert(!!process.env.DB_SECRET_ACCESS_KEY, "DB_SECRET_ACCESS_KEY was undefined");
        assert(!!process.env.DB_REGION, "DB_REGION was undefined");
        assert(!!process.env.DB_ENDPOINT, "DB_ENDPOINT was undefined");
        assert(!!process.env.DB_TABLE_NAME, "DB_TABLE_NAME was undefined");

        this.dbAccessKeyId = process.env.DB_ACCESS_KEY_ID;
        this.dbSecretAccessKey = process.env.DB_SECRET_ACCESS_KEY;
        this.dbRegion = process.env.DB_REGION;
        this.tableName = process.env.DB_TABLE_NAME;
        this.endpoint = process.env.DB_ENDPOINT;
    }
}
