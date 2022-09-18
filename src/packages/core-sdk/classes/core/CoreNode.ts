import {A_Status, A_VersionsCheck} from "../../types";
import {
    REACT_APP_STABLE_CONSENSUS_VERSION,
    REACT_APP_MAINNET_HASH,
    REACT_APP_SANDNET_GENESIS_ID,
    REACT_APP_TESTNET_HASH,
    REACT_APP_BETA_CONSENSUS_VERSION,
    REACT_APP_MASTER_CONSENSUS_VERSION,
    REACT_APP_NIGHTLY_CONSENSUS_VERSION
} from "../../../../env";

export class CoreNode {

    isSandbox(versions: A_VersionsCheck): boolean {
        return this.getGenesisId(versions) === REACT_APP_SANDNET_GENESIS_ID;
    }

    isTestnet(versions: A_VersionsCheck): boolean {
        return this.getGenesisHash(versions) === REACT_APP_TESTNET_HASH;
    }

    isMainnet(versions: A_VersionsCheck): boolean {
        return this.getGenesisHash(versions) === REACT_APP_MAINNET_HASH;
    }

    getGenesisId(versions: A_VersionsCheck): string {
        return versions.genesis_id;
    }

    getGenesisHash(versions: A_VersionsCheck): string {
        return versions.genesis_hash_b64;
    }

    getDispenserLinks(versions: A_VersionsCheck): string[] {
        const links: string[] = [];

        if (this.isTestnet(versions)) {
            links.push('https://testnet.algoexplorer.io/dispenser');
            links.push('https://bank.testnet.algorand.network');
        }
        if (this.isMainnet(versions)) {

        }

        return links;
    }

    getConsensusVersion(status: A_Status): string {
        return status["last-version"];
    }

    getLatestConsensusVersion(verisons: A_VersionsCheck, status: A_Status): string {
        if (this.isTestnet(verisons)) {
            return REACT_APP_STABLE_CONSENSUS_VERSION;
        }
        if (this.isMainnet(verisons)) {
            return REACT_APP_STABLE_CONSENSUS_VERSION;
        }
        if (this.isSandbox(verisons)) {
            return this.getConsensusVersion(status);
        }
    }

    hasLatestConsensusVersion(status: A_Status, verisons: A_VersionsCheck): boolean {
        const consensusVersion = this.getConsensusVersion(status);
        const latestConsensusVersion = this.getLatestConsensusVersion(verisons, status);

        return consensusVersion === latestConsensusVersion;
    }

    sandboxConsensusValidation(status: A_Status, verisons: A_VersionsCheck): {valid: boolean, message: string} {
        const validation = {
            valid: false,
            message: 'Node has outdated consensus'
        };

        if (this.isSandbox(verisons)) {
            const consensusVersion = this.getConsensusVersion(status);
            if (consensusVersion === REACT_APP_STABLE_CONSENSUS_VERSION) {
                validation.valid = true;
                validation.message = 'Node has latest stable version';
            }
            else if (consensusVersion === REACT_APP_BETA_CONSENSUS_VERSION) {
                validation.valid = true;
                validation.message = 'Node has latest beta version';
            }
            else if (consensusVersion === REACT_APP_MASTER_CONSENSUS_VERSION || consensusVersion === REACT_APP_NIGHTLY_CONSENSUS_VERSION) {
                validation.valid = true;
                validation.message = 'Node has future(master/nightly) consensus version';
            }
        }

        return validation;
    }
}