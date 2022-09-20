import {
    A_AccountInformation, A_Application, A_AppsLocalState, A_Asset, A_AssetHolding
} from "../../types";


export class CoreAccount {
    account: A_AccountInformation;

    constructor(account: A_AccountInformation) {
        if (!account) {
            throw new Error("Invalid account");
        }
        this.account = account;
    }

    get(): A_AccountInformation{
        return this.account;
    }

    getCreatedAssets(): A_Asset[]{
        const createdAssets = this.account['created-assets'];
        return createdAssets;
    }

    getCreatedApplications(): A_Application[]{
        const createdApps = this.account['created-apps'];
        return createdApps;
    }

    getOptedApplications(): A_AppsLocalState[]{
        const optedApps = this.account['apps-local-state'];
        return optedApps;
    }

    getBalance(): number {
        return this.account.amount;
    }

    getMinBalance(): number {
        return this.account["min-balance"];
    }

    getHoldingAssets(): A_AssetHolding[]{
        return this.account['assets'];
    }

    isCreatedAsset(assetId: number): boolean {
        const createdAssets = this.getCreatedAssets();

        for (const asset of createdAssets) {
            if (asset.index === assetId) {
                return true;
            }
        }

        return false;
    }

    getCreatedAsset(assetId: number): A_Asset {
        const createdAssets = this.getCreatedAssets();

        for (const asset of createdAssets) {
            if (asset.index === assetId) {
                return asset;
            }
        }
    }

    getHoldingAsset(assetId: number): A_AssetHolding {
        const assets = this.getHoldingAssets();
        for (const asset of assets) {
            if (asset['asset-id'] === assetId) {
                return asset;
            }
        }
    }

    balanceOf(assetId: number): number {
        const asset = this.getHoldingAsset(assetId);

        if (asset) {
            return asset.amount;
        }

        return 0;
    }

    getAssetBal(asset: A_Asset): number {
        return this.balanceOf(asset.index) / Math.pow(10, asset.params.decimals);
    }
}