export interface BreadCrumb {
	label: string;
	url: string;
	infoLink?: string;
	hidden?: boolean;
	queryParams?: breadCrumbSubtitle[];
	onBack?: boolean;
}

interface breadCrumbSubtitle {
	key: string;
	value: string;
}
