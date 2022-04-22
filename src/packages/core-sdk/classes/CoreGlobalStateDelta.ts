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
        return this.state.value.bytes !== undefined ? this.state.value.bytes : this.state.value.uint.toString();
    }
}