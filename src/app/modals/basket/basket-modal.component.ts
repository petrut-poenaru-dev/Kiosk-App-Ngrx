import {Component, HostListener, OnDestroy, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CategoryProductInterface} from "../../interfaces/category-product.interface";
import {TranslateModule} from "@ngx-translate/core";
import {PriceFormatPipe} from "../../pipes/price-format.pipe";
import {Router} from "@angular/router";
import {AppStateInterface} from "../../store/app.reducer";
import {Store} from "@ngrx/store";
import {
  closeAllModals,
  decreaseProductQuantity,
  increaseProductQuantity, openCancelOrderModal,
  openRemoveProductFromBasketModal
} from "../../store/app.actions";
import {selectBasket, selectTotalPrice} from "../../store/app.selectors";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-basket-modal',
  templateUrl: 'basket-modal.component.html',
  styleUrls: ['basket-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslateModule, PriceFormatPipe]
})
export class BasketModalComponent implements OnInit, OnDestroy {
  public basket!: Array<CategoryProductInterface>
  public totalPriceSubs!: number;
  public basket$ = this._store.select(selectBasket)
  public totalPrice$ = this._store.select(selectTotalPrice)
  public destroy$: Subject<void> = new Subject<void>();

  constructor(private _router: Router, private _store: Store<AppStateInterface>) {
  }

  @HostListener('document:keydown', ['$event'])
  public onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.closeModal();
    }
  }

  public closeModal(): void {
    this._store.dispatch(closeAllModals());
  }

  ngOnInit(): void {
    this.basket$.pipe(takeUntil(this.destroy$)).subscribe(basket => {
      this.basket = basket;
    })
    this.totalPrice$.pipe(takeUntil(this.destroy$)).subscribe(totalPrice => {
      this.totalPriceSubs = totalPrice;
    })
  }

  public openDeleteFromBasketModal(productId: number): void {
    this._store.dispatch(openRemoveProductFromBasketModal({productId: productId}))
  }

  public increaseQuantity(productId: number, productPrice: number): void {
    this._store.dispatch(increaseProductQuantity({productId: productId, productPrice: productPrice}))
  }

  public decreaseQuantity(productId: number, productPrice: number, productQuantity: number): void {
    if (productQuantity <= 1) {
      return;
    }
    this._store.dispatch(decreaseProductQuantity({productId: productId, productPrice: productPrice}))
  }

  public openCancelOrderModal(): void {
    this._store.dispatch(openCancelOrderModal());
  }

  public addNow() {
    this._router.navigate(['/menu']).then();
    this.closeModal();
  }

  public goToPay() {
    this._router.navigate(['/payment-menu']).then();
    this.closeModal();
  }

  public ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
