export interface IDbConfiguration {
    readonly dbRegion: string;
    readonly tableName: string;
    readonly endpoint: string;
    readonly dbIndexName: string;
}

export const IDbConfiguration = Symbol.for("IDbConfiguration");
