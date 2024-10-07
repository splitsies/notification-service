export interface ITokenConfiguration {
    ttlDays: number;
}

export const ITokenConfiguration = Symbol.for("ITokenConfiguration");