import {A_Genesis, A_Status, A_VersionsCheck} from "../../types";
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
    private status: A_Status;
    private versions: A_VersionsCheck;
    private genesis: A_Genesis;

    constructor(status: A_Status, versions: A_VersionsCheck, genesis: A_Genesis) {
        this.status = status;
        this.versions = versions;
        this.genesis = genesis;
    }
    
    isSandbox(): boolean {
        return this.getGenesisId() === REACT_APP_SANDNET_GENESIS_ID;
    }

    isTestnet(): boolean {
        return this.getGenesisHash() === REACT_APP_TESTNET_HASH;
    }

    isMainnet(): boolean {
        return this.getGenesisHash() === REACT_APP_MAINNET_HASH;
    }

    getGenesisId(): string {
        return this.versions.genesis_id;
    }

    getGenesisHash(): string {
        return this.versions.genesis_hash_b64;
    }

    getDispenserLinks(): string[] {
        const links: string[] = [];

        if (this.isTestnet()) {
            links.push('https://testnet.algoexplorer.io/dispenser');
            links.push('https://bank.testnet.algorand.network');
        }
        if (this.isMainnet()) {

        }

        return links;
    }

    getConsensusVersion(): string {
        return this.status["last-version"];
    }

    getLatestConsensusVersion(): string {
        if (this.isTestnet()) {
            return REACT_APP_STABLE_CONSENSUS_VERSION;
        }
        if (this.isMainnet()) {
            return REACT_APP_STABLE_CONSENSUS_VERSION;
        }
        if (this.isSandbox()) {
            return this.getConsensusVersion();
        }
    }

    hasLatestConsensusVersion(): boolean {
        const consensusVersion = this.getConsensusVersion();
        const latestConsensusVersion = this.getLatestConsensusVersion();

        return consensusVersion === latestConsensusVersion;
    }

    sandboxConsensusValidation(): {valid: boolean, message: string} {
        const validation = {
            valid: false,
            message: 'Node has outdated consensus'
        };

        if (this.isSandbox()) {
            const consensusVersion = this.getConsensusVersion();
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

    getFeeSinkAddress(): string {
        return this.genesis.fees;
    }

    getRewardsPoolAddress(): string {
        return this.genesis.rwd;
    }

    getBuildVersion(): string {
        const {build} = this.versions;
        console.log(build);
        const {major, minor, build_number, branch, channel} = build;
        return `${major}.${minor}.${build_number} (${branch}) [${channel}]`;
    }
}