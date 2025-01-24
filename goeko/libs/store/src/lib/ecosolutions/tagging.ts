import { TAGGING, TaggingEnum } from './tagging.enum'

export interface Tagging {
  smeId: string
  ecosolutionId: string
  tag: TaggingEnum
}

export class FavouritesEcosolutionsTagging implements Tagging {
  smeId!: string
  ecosolutionId!: string
  tag!: TaggingEnum
  constructor(smeId: string, ecosolutionId: string) {
    this.smeId = smeId
    this.ecosolutionId = ecosolutionId
    this.tag = TaggingEnum.FAVOURITES
  }
}

export class NotInterestedEcosolutionsTagging implements Tagging {
  smeId!: string
  ecosolutionId!: string
  tag!: TaggingEnum
  constructor(smeId: string, ecosolutionId: string) {
    this.smeId = smeId
    this.ecosolutionId = ecosolutionId
    this.tag = TaggingEnum.NOT_INTERESTED
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
