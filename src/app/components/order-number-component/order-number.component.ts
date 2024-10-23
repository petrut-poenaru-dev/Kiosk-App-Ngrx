import {Component, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {AppService} from "../../services/app.service";
import {Router, RouterModule} from "@angular/router";
import {Store} from "@ngrx/store";
import {appActions, StoreStateInterface} from "../../store/index";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector:'app-order-number',
  templateUrl:'order-number.component.html',
  styleUrls:['order-number.component.scss'],
  standalone:true,
  imports:[CommonModule , TranslateModule , RouterModule]
})
export class OrderNumberComponent implements OnInit{
  public orderNumber:number = 0;
  private _destroy$:Subject<void> = new Subject<void>()
  constructor(private _appService:AppService , private _router:Router , private _store: Store<StoreStateInterface>) {
  }

  ngOnInit(): void {
    this._appService.getOrderNumber().pipe(takeUntil(this._destroy$)).subscribe(orderNumber => {
      this.orderNumber = orderNumber;
    })
    setTimeout(() => {
      this._store.dispatch(appActions.cancelOrder())
      this._router.navigate(['']).then();
    } , 3000)
  }

  ngOnDestroy(): void {
    this._destroy$.next()
    this._destroy$.complete()
  }
}
