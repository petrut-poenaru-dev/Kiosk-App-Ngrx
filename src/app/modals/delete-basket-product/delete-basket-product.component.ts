import {Component, HostListener} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ModalService} from "../../services/modal.service";
import {Router} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector:'app-delete-basket-product',
  templateUrl:'delete-basket-product.component.html',
  styleUrls:['delete-basket-product.component.scss'],
  standalone:true,
  imports:[CommonModule , TranslateModule]
})
export class DeleteBasketProductComponent{
  constructor(private _modalService:ModalService , private _router:Router) {}

  @HostListener('document:keydown', ['$event'])
  public onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.closeModal();
    }
  }

  public closeModal(): void{
    this._modalService.closeModal();
  }

  public deleteProduct(){
    this._modalService.removeProductFromBasket();
    this.closeModal();
  }

  public dontDeleteProduct(){
    this._modalService.closeModal();
  }
}
