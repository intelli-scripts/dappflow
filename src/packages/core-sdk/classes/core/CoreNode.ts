import {A_VersionsCheck} from "../../types";
import {CoreVersionsCheck} from "./CoreVersionsCheck";

export class CoreNode {

    isSandbox(versions: A_VersionsCheck): boolean {
        return new CoreVersionsCheck(versions).getGenesisId() === 'sandnet-v1';
    }

    isTestnet(versions: A_VersionsCheck): boolean {
        return new CoreVersionsCheck(versions).getGenesisHash() === 'SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=';
    }

    isMainnet(versions: A_VersionsCheck): boolean {
        return new CoreVersionsCheck(versions).getGenesisHash() === 'wGHE2Pwdvd7S12BL5FaOP20EGYesN73ktiC1qzkkit8=';
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
}