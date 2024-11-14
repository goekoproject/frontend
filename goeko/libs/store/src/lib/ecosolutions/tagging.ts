import { TAGGING } from './tagging.enum'

export interface Tagging {
  smeId: string
  ecosolutionId: string
  tagging(): void
}

export class FavouritesEcosolutionsTagging implements Tagging {
  smeId!: string
  ecosolutionId!: string
  tag!: string
  constructor(smeId: string, ecosolutionId: string) {
    this.smeId = smeId
    this.ecosolutionId = ecosolutionId
  }

  tagging() {
    this.tag = TAGGING.FAVOURITES
    return this
  }
}

export class NotInterestedEcosolutionsTagging implements Tagging {
  smeId!: string
  ecosolutionId!: string
  tag!: string
  constructor(smeId: string, ecosolutionId: string) {
    this.smeId = smeId
    this.ecosolutionId = ecosolutionId
  }
  tagging() {
    this.tag = TAGGING.NOT_INTERESTED
    return this
  }
}

export class TaggingFactory {
  static createTagging(type: string, smeId: string, ecosolutionId: string): Tagging {
    switch (type) {
      case TAGGING.FAVOURITES:
        return new FavouritesEcosolutionsTagging(smeId, ecosolutionId)
      case TAGGING.NOT_INTERESTED:
        return new NotInterestedEcosolutionsTagging(smeId, ecosolutionId)
      default:
        throw new Error('Invalid type')
    }
  }
}
