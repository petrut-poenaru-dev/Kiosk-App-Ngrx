import {Component, HostListener} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {Router} from "@angular/router";
import {AppStateInterface} from "../../store/app.reducer";
import {Store} from "@ngrx/store";
import {cancelOrder, closeCancelOrderModal} from "../../store/app.actions";

@Component({
  selector:'app-cancel-order-modal',
  templateUrl:'cancel-order-modal.component.html',
  styleUrls:['cancel-order-modal.component.scss'],
  standalone:true,
  imports:[CommonModule , TranslateModule]
})
export class CancelOrderModalComponent{

  constructor(private _router:Router , private _store:Store<AppStateInterface>) {}

  @HostListener('document:keydown', ['$event'])
  public onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.closeModal();
    }
  }

  public closeModal(): void{
    this._store.dispatch(closeCancelOrderModal());
  }

  public cancelOrder(){
    this._store.dispatch(cancelOrder());
    this._router.navigate(['']);
  }

  public dontCancel(){
    this.closeModal();
  }
}
