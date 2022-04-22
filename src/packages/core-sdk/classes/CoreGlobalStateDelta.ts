import {
    A_GlobalStateDelta
} from "../types";
import atob from 'atob';


export class CoreGlobalState {
    state: A_GlobalStateDelta;

    constructor(state: A_GlobalStateDelta) {
        this.state = state;
    }

    get(): A_GlobalStateDelta{
        return this.state;
    }

    getType(): string {
        return this.state.value.bytes !== undefined ? 'Bytes' : 'Uint';
    }

    getKey(): string {
        return atob(this.state.key);
    }

    getValue(): string {
        return this.state.value.bytes !== undefined ? this.state.value.bytes : this.state.value.uint.toString();
    }
}