import {
    A_GlobalStateDelta
} from "../types";
import {encodeAddress} from "algosdk";
import isUtf8 from 'is-utf8';


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
        if (action === 3) {
            if (this.state.value.bytes !== undefined) {
                return 'Bytes';
            }
            return 'Uint';
        }

        return '';
    }

    getKey(): string {
        const key = Buffer.from(this.state.key, 'base64');

        if (isUtf8(key)) {
            return  key.toString();
        }
        else {
            return  '0x' + key.toString('hex');
        }
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
                let val = Buffer.from(this.state.value.bytes, 'base64');

                if (isUtf8(val)) {
                    return  val.toString();
                }
                else {
                    return  val.toString('base64');
                }
            }
        }

        return this.state.value.uint.toString();
    }
}