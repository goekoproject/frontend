import { ContentTypeActors } from "./content-type-actors.interface";
import { ContentTypeLandingPage } from "./content-type-landing.interface";

export interface IContent {
    id: number;
    title: string;
    info: string;
    optionsInfo: string;
    options: ContentOptions,
}

export interface ContentOptions {
    text: string;
    image: string;
}

 export class ContentPage implements IContent {
    id!: number;
    title!: string;
    info!: string;
    optionsInfo!: string;
    options!: ContentOptions;

    constructor(body: ContentTypeActors) {
        if(body) {
            this.id = 1,
            this.title = body.name;
            this.info = body.descriptions;
            this.options = body.benefit;
        }
    }

} 