import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AppService} from "./services/app.service";
import {CommonModule} from "@angular/common";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {ProductDetailsModalComponent} from "./modals/product-details-modal/product-details-modal.component";
import {BasketModalComponent} from "./modals/basket/basket-modal.component";
import {CancelOrderModalComponent} from "./modals/cancel-order-modal/cancel-order-modal.component";
import {DeleteBasketProductComponent} from "./modals/delete-basket-product/delete-basket-product.component";
import {Store} from "@ngrx/store";
import {
  selectIsOpenBasketModal,
  selectIsOpenCancelOrderModal, selectIsOpenDeleteBasketProductModal,
  selectIsOpenProductDetailsModal
} from "./store/app.selectors";
import {AppStateInterface} from "./store/app.reducer";
import {appActions} from "./store/index";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , CommonModule , TranslateModule , ProductDetailsModalComponent , BasketModalComponent , CancelOrderModalComponent , DeleteBasketProductComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  public title = 'Kiosk';
  public bundleSettings!:{languages:Array<string>};
  public products:any;
  public isOpenProductDetailsModal$ = this._store.select(selectIsOpenProductDetailsModal);
  public isOpenBasketModal$ = this._store.select(selectIsOpenBasketModal);
  public isOpenCancelOrderModal$ = this._store.select(selectIsOpenCancelOrderModal);
  public isOpenDeleteBasketProductModal$ = this._store.select(selectIsOpenDeleteBasketProductModal);

  constructor(private _appService:AppService , private translate: TranslateService , private _store:Store<AppStateInterface>) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit(): void {
    this._store.dispatch(appActions.initApp());
  }

}
