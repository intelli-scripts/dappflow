import {ARC} from "../classes/ARC";
import axios from "axios";
import {getArc} from "../utils";

export class ArcClient{

    async loadMarkdown(id: number): Promise<string> {
        const arc = getArc(id);

        const arcInstance = new ARC(arc);
        const url = arcInstance.getMarkdownUrl();
        const response = await axios.get(url);
        return response.data;
    }

}