export interface IProduct {
  id?: number,
  title: string,
  price: number | string,
  description: string,
  category: string,
  image: string,
  rating: {
    rate: number | string,
    count: number
  }
}