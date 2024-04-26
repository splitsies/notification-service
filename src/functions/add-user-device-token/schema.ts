export default {
    type: "object",
    properties: {
        userId: { type: "string" },
        deviceToken: { type: "string" },
    },
    required: ["userId", "deviceToken"],
} as const;
