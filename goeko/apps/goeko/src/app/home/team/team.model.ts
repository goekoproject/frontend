export interface DataTeamResponse {
	employedName: string;
	info: {
		data: any;
		content: any[];
		nodeType: string;
	};
	job: {
		data: any;
		content: any[];
		nodeType: string;
	};
	photoProfile: {
		metadata: any;
		sys: any;
		fields: any;
	};
	subtitle: {
		data: any;
		content: any[];
		nodeType: string;
	};
	title: string;
}

export class DataTeam {
	employedName: string;
	info: string;
	photoProfile: string;
	job: string;
	constructor(dataTeam: DataTeamResponse) {
		this.employedName = dataTeam.employedName;
		this.info = this._getDataContentInfo(dataTeam.info);
		this.photoProfile = this._getDataContentAsset(dataTeam.photoProfile);
		this.job = this._getDataContent(dataTeam.job);
	}

	private _getDataContent(dataTeam: any) {
		return dataTeam.content?.map((data: any) => data.content?.map((content: any) => content.value))[0]?.toString();
	}
	private _getDataContentAsset(dataTeam: any) {
		return dataTeam.fields?.file.url;
	}
	private _getDataContentInfo(dataTeam: any) {
		return dataTeam.content?.map((data: any) => data.content?.map((content: any) => content.value));
	}
}
