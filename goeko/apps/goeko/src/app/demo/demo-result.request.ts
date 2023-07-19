export class MainProduct {
	name: string;
	lastYearInvoice?: string;

	constructor(name: string, lastYearInvoice?: string) {
		this.name = name ?? 'mock';
		this.lastYearInvoice = lastYearInvoice ?? '112222';
	}
}

export class CompanyDetail {
	name: string;
	numberEmployees: string;
	countries: string[];
	email: string;
	link: string;

	constructor(data: any) {
		this.name = data.name;
		this.numberEmployees = data.numberEmployees;
		this.countries = [data.countries];
		this.email = data.email;
		this.link = data.link;
	}
}
export class Co2Emission {
	mainInternalCombustionEngine: MainProduct;
	mainMineralProduct: MainProduct;
	mainRigidMaterial: MainProduct;

	constructor(data: any) {
		this.mainInternalCombustionEngine = new MainProduct(data.mainInternalCombustionEngine, '12323');
		this.mainMineralProduct = new MainProduct(data.mainMineralProduct || 'concrete', '1233');
		this.mainRigidMaterial = data.mainRigidMaterial;
	}
}

export class Waste {
	mainCategoryNonInert: string;

	constructor(mainCategoryNonInert: string) {
		this.mainCategoryNonInert = mainCategoryNonInert;
	}
}

export class HazardousProduct {
	products: string[];
	constructor(products: string[]) {
		this.products = products;
	}
}

export class WaterConsumption {
	mainActivity: string[];
	amount: string;
	lastYearInvoice: string;

	constructor(data: any) {
		this.mainActivity = data?.mainActivity;
		this.amount = data?.amount || '1111111';
		this.lastYearInvoice = data?.lastYearInvoice || '1111';
	}
}
export class SmeRecomendationParams {
	companyDetail: CompanyDetail;
	co2Emission: Co2Emission;
	waste: Waste;
	hazardousProduct: HazardousProduct;
	waterConsumption: WaterConsumption;

	constructor(dataForm: any) {
		this.co2Emission = new Co2Emission(dataForm.co2Emission);
		this.companyDetail = new CompanyDetail(dataForm.companyDetail);
		this.waste = new Waste(dataForm?.waste?.mainCategoryNonInert);
		this.hazardousProduct = new HazardousProduct(dataForm.hazardousProduct.products);
		this.waterConsumption = new WaterConsumption(dataForm.waterConsumption);
	}
}
