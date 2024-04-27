const userDeviceToken = {
    type: "object",
    properties: {
        userId: { type: "string" },
        deviceToken: { type: "string" },
    },
    required: ["userId", "deviceToken"]
} as const;

export default {
    type: "object",
    properties: {
        oldToken: userDeviceToken,
        newToken: userDeviceToken
    }
} as const;
