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

    isDeleted(): boolean {
        return this.application.deleted;
    }

    getCreationBlock(): number {
        return this.application["created-at-round"];
    }
}