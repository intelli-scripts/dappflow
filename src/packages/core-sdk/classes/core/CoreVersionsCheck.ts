import {
    A_VersionsCheck
} from "../../types";


export class CoreVersionsCheck {
    versionsCheck: A_VersionsCheck;

    constructor(versionsCheck: A_VersionsCheck) {
        this.versionsCheck = versionsCheck;
    }

    getGenesisId(): string {
        return this.versionsCheck.genesis_id;
    }

    getGenesisHash(): string {
        return this.versionsCheck.genesis_hash_b64;
    }
}