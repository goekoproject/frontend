export interface Partner {
  id: string
  title: string
  description: string
  image: string
  code: string
}

export interface PartnerCollection {
  id: string
  title: string
  description: {
    [lang: string]: string
  }
  image: string
  code: string
}
