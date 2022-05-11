import {
    A_GlobalStateDelta
} from "../types";
import atob from 'atob';
import {encodeAddress} from "algosdk";


export class CoreGlobalState {
    state: A_GlobalStateDelta;

    constructor(state: A_GlobalStateDelta) {
        this.state = state;
    }

    get(): A_GlobalStateDelta{
        return this.state;
    }

    getType(): string {
        const action = this.getAction();

        if (action === 1) {
            return 'Bytes';
        }
        if (action === 2) {
            return 'Uint';
        }

        return '';
    }

    getKey(): string {
        return atob(this.state.key);
    }

    getAction(): number {
        return this.state.value.action;
    }

    getActionDisplayValue() {
        const action = this.getAction();

        if (action === 1 || action === 2) {
            return 'Set';
        }
        if (action === 3) {
            return 'Delete';
        }

        return '';
    }

    getValue(): string {

        if (this.state.value.bytes !== undefined) {
            const buf = Buffer.from(this.state.value.bytes, 'base64');

            if (buf.length === 32) {
                return  encodeAddress(new Uint8Array(buf));
            }
            else {
                return  atob(this.state.value.bytes);
            }
        }

        return this.state.value.uint.toString();
    }
}