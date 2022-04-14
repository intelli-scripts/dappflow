import {
    A_Application, A_GlobalState, A_GlobalStateDecrypted
} from "../types";
import atob from 'atob';
import {encodeAddress} from "algosdk";


export class CoreApplication {
    application: A_Application;

    constructor(application: A_Application) {
        this.application = application;
    }

    get(): A_Application{
        return this.application;
    }

    getId(): number {
        return this.application.id;
    }

    getCreator(): string {
        return this.application.params.creator;
    }

    getApprovalProgram(): string {
        return this.application.params["approval-program"];
    }

    getClearProgram(): string {
        return this.application.params["clear-state-program"];
    }

    getGlobalSchemaByte(): number {
        return this.application.params["global-state-schema"]["num-byte-slice"];
    }

    getGlobalSchemaUint(): number {
        return this.application.params["global-state-schema"]["num-uint"];
    }

    getLocalSchemaByte(): number {
        return this.application.params["local-state-schema"]["num-byte-slice"];
    }

    getLocalSchemaUint(): number {
        return this.application.params["local-state-schema"]["num-uint"];
    }

    getGlobalStorage(): A_GlobalState[] {
        return this.application.params["global-state"];
    }

    getGlobalStorageDecrypted(): A_GlobalStateDecrypted[] {
        const gStateDecrypted: A_GlobalStateDecrypted[] = [];

        const gState = this.getGlobalStorage();

        gState.forEach((gStateProp) => {
            const row:A_GlobalStateDecrypted = {key: "", type: "", value: undefined};

            row.key = atob(gStateProp.key);
            const {value} = gStateProp;

            if (value.type === 1) {
                row.type = 'bytes';

                try {
                    row.value = encodeAddress(new Uint8Array(Buffer.from(value.bytes, "base64")));
                    console.log(row.value);
                }
                catch (e) {
                    console.log(e);
                    row.value = atob(value.bytes);
                }

            }
            else {
                row.type = 'uint';
                row.value = value.uint;
            }

            gStateDecrypted.push(row);
        });

        return gStateDecrypted;
    }
}