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
import {appActions, StoreStateInterface} from "./store/index";
import {settingsActions} from "./settings/index";
import {selectInactivityWarningTimer, selectLanguage} from "./settings/settings.selectors";

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
  public warningTimer = this._store.select(selectInactivityWarningTimer);

  constructor(private _appService:AppService , private translate: TranslateService , private _store: Store<StoreStateInterface>) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit(): void {
    this._store.dispatch(appActions.initApp());
    this._appService.getBundleSettings().subscribe(settings => {
      this._store.dispatch(settingsActions.getBundleSettings({settings}));
    })
  }

}
