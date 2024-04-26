
import { injectable, inject } from "inversify";
import { IAdminAuthProvider } from "./admin-auth-provider-interface";
import { initializeApp } from "firebase-admin/app";
import { Auth, getAuth } from "firebase-admin/auth";
import { IFirebaseConfiguration } from "../../models/configuration/firebase/firebase-configuration-interface";

@injectable()
export class AdminAuthProvider implements IAdminAuthProvider {
    private readonly auth: Auth;

    constructor(
        @inject(IFirebaseConfiguration) firebaseConfig: IFirebaseConfiguration,
    ) {

        const firebaseApp = initializeApp(firebaseConfig);
        this.auth = getAuth(firebaseApp);
    }

    provide(): Auth {
        return this.auth;
    }
}
