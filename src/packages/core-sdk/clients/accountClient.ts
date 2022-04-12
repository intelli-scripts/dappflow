import {Algodv2} from "algosdk";
import IndexerClient from "algosdk/dist/types/src/client/v2/indexer/indexer";
import {A_AccountInformation, A_Asset, A_AssetHolding, A_Application, A_AppsLocalState} from "../types";
import {Network} from "../network";

export class AccountClient{
    client: Algodv2;
    indexer: IndexerClient;
    network: Network

    constructor(network: Network) {
        this.network = network;
        this.client = network.getClient();
        this.indexer = network.getIndexer();
    }

    async getAccountInformation(address: string): Promise<A_AccountInformation> {
        const accountInformation = await this.client.accountInformation(address).do() as A_AccountInformation;
        return accountInformation;
    }

    getCreatedAssets(accountInfo: A_AccountInformation): A_Asset[]{
        const createdAssets = accountInfo['created-assets'];
        return createdAssets;
    }

    getHoldingAssets(accountInfo: A_AccountInformation): A_AssetHolding[]{
        const createdAssets = accountInfo['assets'];
        return createdAssets;
    }

    getCreatedApps(accountInfo: A_AccountInformation): A_Application[] {
        const createdApps = accountInfo['created-apps'];
        return createdApps;
    }

    getOptedApps(accountInfo: A_AccountInformation): A_AppsLocalState[] {
        const optedApps = accountInfo['apps-local-state'];
        return optedApps;
    }

    getOptedApp(appId: number, accountInfo: A_AccountInformation): A_AppsLocalState {
        const apps = this.getOptedApps(accountInfo);
        for (const app of apps) {
            if (app.id === appId) {
                return app;
            }
        }
    }

    getHoldingAsset(assetId: number, accountInfo: A_AccountInformation): A_AssetHolding {
        const assets = this.getHoldingAssets(accountInfo);
        for (const asset of assets) {
            if (asset['asset-id'] === assetId) {
                return asset;
            }
        }
    }

    getCreatedAsset(assetId: number, accountInfo: A_AccountInformation): A_Asset {
        const createdAssets = this.getCreatedAssets(accountInfo);
        for (const asset of createdAssets) {
            if (asset.index === assetId) {
                return asset;
            }
        }
    }

    isCreatedAsset(assetId: number, accountInfo: A_AccountInformation): boolean {
        const createdAssets = this.getCreatedAssets(accountInfo);
        for (const asset of createdAssets) {
            if (asset.index === assetId) {
                return true;
            }
        }

        return false;
    }

    balanceOf(assetId: number, accountInfo: A_AccountInformation): number {
        const asset = this.getHoldingAsset(assetId, accountInfo);

        if (asset) {
            return asset.amount;
        }

        return 0;
    }

    canManage(address: string, asset: A_Asset): boolean {
        const manager = asset.params.manager;
        return address === manager;
    }

    canFreeze(address: string, asset: A_Asset): boolean {
        const freeze = asset.params.freeze;
        return address === freeze;
    }

    canClawback(address: string, asset: A_Asset): boolean {
        const clawback = asset.params.clawback;
        return address === clawback;
    }

    getAssetBal(asset: A_Asset, information: A_AccountInformation): number {
        return this.balanceOf(asset.index, information) / Math.pow(10, asset.params.decimals);
    }

    getBalance(accountInfo: A_AccountInformation): number {
        return accountInfo.amount;
    }
}