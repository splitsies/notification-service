import { injectable } from "inversify";
import { ITokenConfiguration } from "./token-configuration-interface";
import { assert } from "console";

@injectable()
export class TokenConfiguration implements ITokenConfiguration {
    ttlDays: number;

    constructor() {
        assert(!!process.env.TOKEN_TTL_DAYS, "TOKEN_TTL_DAYS was undefined");

        this.ttlDays = parseInt(process.env.TOKEN_TTL_DAYS);
    }
}