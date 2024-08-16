import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {CategoryProductInterface} from "../interfaces/category-product.interface";

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  public isOpenProductDetailsModal$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  public isOpenBasketModal$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  public isOpenCancelOrderModal$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  public isOpenDeleteBasketProductModal$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  public productCategory$: BehaviorSubject<string> = new BehaviorSubject<string>('')
  public productId$: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  public basket$: BehaviorSubject<Array<CategoryProductInterface>> = new BehaviorSubject<Array<CategoryProductInterface>>([])

  public openProductDetailsModal(category: string, id: number): void {
    this.isOpenProductDetailsModal$.next(true)
    this.productCategory$.next(category)
    this.productId$.next(id)
  }

  public openBasketModal(): void {
    this.isOpenBasketModal$.next(true);
  }

  public closeModal(): void {
    this.isOpenCancelOrderModal$.next(false);
    this.isOpenProductDetailsModal$.next(false);
    this.isOpenBasketModal$.next(false);
    this.isOpenDeleteBasketProductModal$.next(false);
    this.productCategory$.next('');
    this.productId$.next(0);
  }

  public cancelOrder(): void {
    this.basket$.next([]);
    this.closeModal();
  }

  public removeProductFromBasket(): void {
    const currentBasket = this.basket$.value;
    const updatedBasket = currentBasket.filter(product => product.id !== this.productId$.value);
    this.basket$.next(updatedBasket);
  }

  public openCancelOrderModal(): void {
    this.isOpenBasketModal$.next(false)
    this.isOpenCancelOrderModal$.next(true)
  }

  public openDeleteProductModal(productId:number): void {
    this.productId$.next(productId);
    this.isOpenBasketModal$.next(false)
    this.isOpenDeleteBasketProductModal$.next(true)
  }

  public addProductToBasket(product: CategoryProductInterface): void {
    const currentBasket = this.basket$.value
    const foundElem = this.basket$.value.find(el => {
      return el.id === product.id
    })
    if(foundElem) {
        foundElem.quantity++
        currentBasket[currentBasket.indexOf(foundElem)] = foundElem
      this.basket$.next(currentBasket);
    } else {
      this.basket$.next([...currentBasket, product]);
    }
  }
}
