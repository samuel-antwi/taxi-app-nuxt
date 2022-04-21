interface Quotes {
  quoteId: number
  active: boolean
  class: string
  companyName: string
  companyId: string
  companyLogo: string
  companyPhone: number
  companyLocation: string
  rating: number
  score: number
  price: number
  currency: string
  vehicles: never
  paymentOptions: never
  highlight: string
  promo: boolean
}

export type quotesType = Quotes[]
