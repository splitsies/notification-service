// import { Credential } from "firebase-admin/app";

export interface IFirebaseConfiguration {
    readonly apiKey: string;
    readonly authDomain: string;
    readonly projectId: string;
    readonly storageBucket: string;
    readonly messagingSenderId: string;
    readonly appId: string;
    readonly measurementId: string;
    // readonly credential: Credential;
    readonly emulatorHost?: string;
}

export const IFirebaseConfiguration = Symbol.for("IFirebaseConfiguration");
