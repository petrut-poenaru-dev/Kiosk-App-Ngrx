import {Component, HostListener, OnInit} from "@angular/core";
import {AppService} from "../../services/app.service";
import {CategoryProductInterface} from "../../interfaces/category-product.interface";
import {ProductsInterface} from "../../interfaces/products.interface";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {PriceFormatPipe} from "../../pipes/price-format.pipe";
import {selectProductCategory, selectProductId} from "../../store/app.selectors";
import {Store} from "@ngrx/store";
import {combineLatest, map, Subject, switchMap, takeUntil} from "rxjs";
import {appActions, StoreStateInterface} from "../../store/index";

@Component({
  selector: 'app-product-details-modal',
  templateUrl: 'product-details-modal.component.html',
  styleUrls: ['product-details-modal.component.scss'],
  imports: [CommonModule, TranslateModule, PriceFormatPipe],
  standalone: true,
})
export class ProductDetailsModalComponent implements OnInit {
  public productCategory$ = this._store.select(selectProductCategory);
  public productId$ = this._store.select(selectProductId);
  public product!: CategoryProductInterface;
  public categorySection!: ProductsInterface;
  private _destroy$:Subject<void> = new Subject<void>()

  constructor(private _appService: AppService , private _store:Store<StoreStateInterface>) {
  }

  @HostListener('document:keydown', ['$event'])
  public onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.closeModal();
    }
  }

  public ngOnInit(): void {
    this.getProduct();
  }

  public closeModal(): void {
    this._store.dispatch(appActions.closeAllModals());
  }


public getProduct(): void {
  combineLatest([this.productId$, this.productCategory$])
    .pipe(
      takeUntil(this._destroy$),
      switchMap(([productId, productCategory]) => {
        return this._appService.getProducts().pipe(
          map(response => {
            const categorySection = <ProductsInterface>response.find((product) => product.title === productCategory);
            const product = <CategoryProductInterface>categorySection.buttons.find((product) => product.id === productId);
            return { categorySection, product };
          })
        );
      })
    )
    .subscribe(({ categorySection, product }) => {
      this.categorySection = categorySection;
      this.product = product;
    });
}

  public addToBasket(): void{
    this._store.dispatch(appActions.addProductToBasket({product:this.product}));
  }

  public ngOnDestroy(): void {
    this._destroy$.next()
    this._destroy$.complete()
  }
}
