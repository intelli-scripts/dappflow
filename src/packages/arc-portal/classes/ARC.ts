import {A_Arc} from "../types";

export class ARC {
    arc: A_Arc;

    constructor(arc: A_Arc) {
        this.arc = arc;
    }

    get(): A_Arc {
        return this.arc;
    }

    getId(): number {
        return this.arc.id;
    }

    getName(): string {
        return this.arc.name;
    }

    getMarkdownUrl():string {
        return this.arc.markdownUrl;
    }

    getGithubUrl():string {
        return this.arc.github;
    }

    getMarkdown():string {
        return this.arc.markdown;
    }

    hasWorkspace():boolean {
        return this.arc.hasWorkspace;
    }

}