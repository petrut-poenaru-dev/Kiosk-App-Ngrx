import {Component} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {Router} from "@angular/router";

@Component({
  selector: 'app-payment-menu',
  templateUrl: 'payment-menu.component.html',
  styleUrls: ['payment-menu.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslateModule]
})
export class PaymentMenuComponent {
  constructor(private _router: Router) {
  }

  public goToOrderNumber() {
    this._router.navigate(['/order-number']).then();
  }
}
