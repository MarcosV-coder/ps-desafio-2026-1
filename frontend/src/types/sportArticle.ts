import { categoryType } from "./category";
export type sportArticleType = {
    id: string
    name: string
    brand: string
    image: string
    price: number | string
    year: number | string
    category: categoryType
    amount: number
}
