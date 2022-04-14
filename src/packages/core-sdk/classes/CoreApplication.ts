import {
    A_Application
} from "../types";


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
}