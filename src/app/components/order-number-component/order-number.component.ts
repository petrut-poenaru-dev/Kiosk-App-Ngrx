import {Component, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {AppService} from "../../services/app.service";

@Component({
  selector:'app-order-number',
  templateUrl:'order-number.component.html',
  styleUrls:['order-number.component.scss'],
  standalone:true,
  imports:[CommonModule , TranslateModule]
})
export class OrderNumberComponent implements OnInit{
  public orderNumber:number = 0;

  constructor(private _appService:AppService) {
  }

  ngOnInit(): void {
    this._appService.getOrderNumber().subscribe(orderNumber => {
      this.orderNumber = orderNumber;
    })
  }


}
