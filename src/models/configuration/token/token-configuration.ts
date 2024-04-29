import { injectable } from "inversify";
import { ITokenConfiguration } from "./token-configuration-interface";
import { assert } from "console";

@injectable()
export class TokenConfiguration implements ITokenConfiguration {
    ttlDays: number;

    constructor() {
        assert(!!process.env.TokenTtlDays, "TokenTtlDays was undefined");

        this.ttlDays = parseInt(process.env.TokenTtlDays);
    }
}