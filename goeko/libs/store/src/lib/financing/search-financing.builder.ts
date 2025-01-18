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

  build(): SearchFinacing | undefined {
    if (!this.sustainableEquipment && !this.realEstate) {
      return undefined
    }
    return {
      sustainableEquipment: this.sustainableEquipment,
      realEstate: this.realEstate,
    }
  }
  clearSustainableEquipment(): void {
    this.sustainableEquipment = undefined as any
    this.realEstate = undefined as any
  }
  isEmpty(): boolean {
    return (
      (!this.sustainableEquipment && !this.sustainableEquipment) ||
      (Object.keys(this.sustainableEquipment).length === 0 && Object.keys(this.realEstate).length === 0)
    )
  }
}
