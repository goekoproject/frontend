export class MainProduct {
	name: string;
	lastYearInvoice?: string;
	products?: Array<string>;
	constructor(name: string, lastYearInvoice?: string, products?: Array<string>) {
		this.name = name ?? 'mock';
		this.products = products || [''];
		this.lastYearInvoice = lastYearInvoice ?? '112222';
	}
}
export class MainProductCombustionEngine {
	name: string;
	lastYearInvoice?: string;
	constructor(name: string, lastYearInvoice?: string) {
		this.name = name ?? 'mock';
		this.lastYearInvoice = lastYearInvoice ?? '112222';
	}
}

export class CompanyDetail {
	name: string;
	numberEmployees: number;
	countries: string[];
	email: string;
	link: string;

	constructor(data: any) {
		this.name = data.name;
		this.numberEmployees = 4;
		this.countries = [data.countries];
		this.email = data.email;
		this.link = data.link;
	}
}
export class Co2Emission {
	mainInternalCombustionEngine: MainProduct;
	mainMineralProduct: MainProduct;
	mainRigidMaterial: MainProduct;
	energySource: EnergySource;

	constructor(data: any) {
		this.mainInternalCombustionEngine = new MainProductCombustionEngine(
			data.mainInternalCombustionEngine?.toString(),
			'12323'
		);
		this.mainMineralProduct = new MainProduct(
			data.mainMineralProduct.toString() || 'concrete',
			'1233',
			data.mainMineralProduct
		);
		this.mainRigidMaterial = data.mainRigidMaterial;
		this.energySource = new EnergySource(data.energySource);
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
		this.products = products || [''];
	}
}

export class WaterConsumption {
	mainActivity: string[];
	amount: string;
	lastYearInvoice: string;

	constructor(data: any) {
		this.mainActivity = data?.mainActivity || [''];
		this.amount = data?.amount || '1111111';
		this.lastYearInvoice = data?.lastYearInvoice || '1111';
	}
}
export class EnergySource {
	sources!: string[];
	constructor(data: any) {
		this.sources = data || [''];
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
		this.waste = new Waste(dataForm?.waste?.mainCategoryNonInert.toString());
		this.hazardousProduct = new HazardousProduct(dataForm?.hazardousProduct?.products);
		this.waterConsumption = new WaterConsumption(dataForm.waterConsumption);
	}
}
