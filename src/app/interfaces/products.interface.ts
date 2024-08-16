import {CategoryProductInterface} from "./category-product.interface";

export interface ProductsInterface {
  id: number,
  title: string,
  img:string,
  buttons: Array<CategoryProductInterface>
}
