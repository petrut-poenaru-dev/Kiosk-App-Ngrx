import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AppService} from "./services/app.service";
import {CommonModule} from "@angular/common";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {ProductDetailsModalComponent} from "./modals/product-details-modal/product-details-modal.component";
import {ModalService} from "./services/modal.service";
import {BasketModalComponent} from "./modals/basket/basket-modal.component";
import {CancelOrderModalComponent} from "./modals/cancel-order-modal/cancel-order-modal.component";
import {DeleteBasketProductComponent} from "./modals/delete-basket-product/delete-basket-product.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , CommonModule , TranslateModule , ProductDetailsModalComponent , BasketModalComponent , CancelOrderModalComponent , DeleteBasketProductComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{
  public title = 'Kiosk';
  public bundleSettings!:{languages:Array<string>};
  public products:any;
  public isOpenProductDetailsModal$ = this._modalService.isOpenProductDetailsModal$;
  public isOpenBasketModal$ = this._modalService.isOpenBasketModal$;
  public isOpenCancelOrderModal$ = this._modalService.isOpenCancelOrderModal$;
  public isOpenDeleteBasketProductModal$ = this._modalService.isOpenDeleteBasketProductModal$;

  constructor(private _appService:AppService , private translate: TranslateService , private _modalService:ModalService) {
    translate.setDefaultLang('en');
    translate.use('en');
  }
}
