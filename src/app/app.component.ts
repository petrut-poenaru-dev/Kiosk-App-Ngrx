import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {AppService} from "./services/app.service";
import {CommonModule} from "@angular/common";
import {ProductDetailsModalComponent} from "./modals/product-details-modal/product-details-modal.component";
import {BasketModalComponent} from "./modals/basket/basket-modal.component";
import {CancelOrderModalComponent} from "./modals/cancel-order-modal/cancel-order-modal.component";
import {DeleteBasketProductComponent} from "./modals/delete-basket-product/delete-basket-product.component";
import {Store} from "@ngrx/store";
import {appActions, StoreStateInterface} from "./store/index";
import {selectInactivityWarningTimer} from "./settings/settings.selectors";
import {ActivityModalComponent} from "./modals/activity-modal/activity-modal.component";
import {BehaviorSubject, Subject, takeUntil} from "rxjs";
import {openActivityModal} from "./store/app.actions";
import {
  selectShowActivityModal,
  selectShowBasketModal,
  selectShowCancelOrderModal,
  selectShowDeleteBasketProductModal,
  selectShowProductDetailsModal
} from "./store/app.selectors";
import {UserActivityService} from "./services/user-activity.service";

const COMPONENTS = [ProductDetailsModalComponent , BasketModalComponent , CancelOrderModalComponent , DeleteBasketProductComponent , ActivityModalComponent]

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , CommonModule , COMPONENTS],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit , OnDestroy{
  public title = 'Kiosk';
  public showProductDetailsModal$ = this._store.select(selectShowProductDetailsModal);
  public showBasketModal$ = this._store.select(selectShowBasketModal);
  public showCancelOrderModal$ = this._store.select(selectShowCancelOrderModal);
  public showDeleteBasketProductModal$ = this._store.select(selectShowDeleteBasketProductModal);
  public showActivityModal$ = this._store.select(selectShowActivityModal);
  private _destroy$:Subject<void> = new Subject<void>();
  constructor(private _appService:AppService, private _userActivityService:UserActivityService, private _store: Store<StoreStateInterface> , private _router:Router) {}

  public ngOnInit(): void {
    this._userActivityService.initUserActivityListener()
    this._store.dispatch(appActions.initApp());
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
