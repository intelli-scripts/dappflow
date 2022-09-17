import {A_Status, A_VersionsCheck} from "../../types";
import {CoreVersionsCheck} from "./CoreVersionsCheck";
import {
    REACT_APP_MAINNET_CONSENSUS,
    REACT_APP_MAINNET_HASH,
    REACT_APP_SANDNET_GENESIS_ID,
    REACT_APP_TESTNET_CONSENSUS,
    REACT_APP_TESTNET_HASH
} from "../../../../env";

export class CoreNode {

    isSandbox(versions: A_VersionsCheck): boolean {
        return new CoreVersionsCheck(versions).getGenesisId() === REACT_APP_SANDNET_GENESIS_ID;
    }

    isTestnet(versions: A_VersionsCheck): boolean {
        return new CoreVersionsCheck(versions).getGenesisHash() === REACT_APP_TESTNET_HASH;
    }

    isMainnet(versions: A_VersionsCheck): boolean {
        return new CoreVersionsCheck(versions).getGenesisHash() === REACT_APP_MAINNET_HASH;
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
            return REACT_APP_TESTNET_CONSENSUS;
        }
        if (this.isMainnet(verisons)) {
            return REACT_APP_MAINNET_CONSENSUS;
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
}