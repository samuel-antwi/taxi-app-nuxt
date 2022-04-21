interface Fleets {
  name: string
  description: string
  image: string
  type: string
  id: number
  capacity: number
  luggage: number
  wifi: boolean
  contactless: boolean
}

export type fleetsType = Fleets[]
