import {Component, HostListener} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ModalService} from "../../services/modal.service";
import {TranslateModule} from "@ngx-translate/core";
import {Router} from "@angular/router";

@Component({
  selector:'app-cancel-order-modal',
  templateUrl:'cancel-order-modal.component.html',
  styleUrls:['cancel-order-modal.component.scss'],
  standalone:true,
  imports:[CommonModule , TranslateModule]
})
export class CancelOrderModalComponent{

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

  public cancelOrder(){
      this._modalService.cancelOrder();
      this._router.navigate(['']);
  }

  public dontCancel(){
    this._modalService.closeModal();
  }
}
