import {Component, HostListener} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Router} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {Store} from "@ngrx/store";
import {AppStateInterface} from "../../store/app.reducer";
import {closeRemoveProductFromBasketModal, removeProductFromBasket} from "../../store/app.actions";

@Component({
  selector:'app-delete-basket-product',
  templateUrl:'delete-basket-product.component.html',
  styleUrls:['delete-basket-product.component.scss'],
  standalone:true,
  imports:[CommonModule , TranslateModule]
})
export class DeleteBasketProductComponent{
  constructor( private _router:Router , private _store:Store<AppStateInterface>) {}

  @HostListener('document:keydown', ['$event'])
  public onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.closeModal();
    }
  }

  public closeModal(): void{
    this._store.dispatch(closeRemoveProductFromBasketModal());
  }

  public deleteProduct(){
    this._store.dispatch(removeProductFromBasket());
  }

  public dontDeleteProduct(){
    this.closeModal();
  }
}
