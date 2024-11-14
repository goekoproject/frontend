export class Advantages {

	title: string;
	description: string;
	icon: string;

	constructor(items: any) {
		this.title = items.fields.title;
		this.description = items.fields.description.content[0].content[0].value;
		this.icon = items.fields.icon.fields.file.url
	}

}


