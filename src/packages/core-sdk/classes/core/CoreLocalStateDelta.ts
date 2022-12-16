import {
    A_AppStateDelta
} from "../../types";
import {CoreGlobalState} from "./CoreGlobalStateDelta";


export class CoreLocalState extends CoreGlobalState{
    state: A_AppStateDelta;

    constructor(state: A_AppStateDelta) {
        super(state);
        this.state = state;
    }
}