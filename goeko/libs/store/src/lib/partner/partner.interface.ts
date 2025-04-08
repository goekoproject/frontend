export interface Partner {
  id: string
  title: string
  description: string
  image: string
  page: string
}

export interface PartnerCollection {
  id: string
  title: string
  description: {
    [lang: string]: string
  }
  image: string
  page: string
}
