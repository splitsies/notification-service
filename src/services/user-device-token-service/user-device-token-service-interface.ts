import { IUserDeviceTokenRequest } from "../../models/user-device-token-request/user-device-token-request-interface";
export interface IUserDeviceTokenService {
    update(params: { newToken?: IUserDeviceTokenRequest,  oldToken?: IUserDeviceTokenRequest}): Promise<void>;
}

export const IUserDeviceTokenService = Symbol.for("IUserDeviceTokenService");