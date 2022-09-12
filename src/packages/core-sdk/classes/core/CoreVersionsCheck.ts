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

    getGenesisHashB64(): string {
        return this.versionsCheck.genesis_hash_b64;
    }
}