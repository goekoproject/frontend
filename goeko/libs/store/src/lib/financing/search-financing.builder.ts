import { SearchFinacing, SearchRealEstate, SearchSustainableEquipment } from './search-financing.interface'

export class SearchFinancingBuilder {
  private sustainableEquipment!: SearchSustainableEquipment
  private realEstate!: SearchRealEstate

  setSustainableEquipment(data: Partial<SearchSustainableEquipment>): this {
    this.sustainableEquipment = { ...this.sustainableEquipment, ...data }
    return this
  }

  setRealEstate(data: Partial<SearchRealEstate>): this {
    this.realEstate = { ...this.realEstate, ...data }
    return this
  }

  build(): SearchFinacing {
    return {
      sustainableEquipment: this.sustainableEquipment,
      realEstate: this.realEstate,
    }
  }
}
