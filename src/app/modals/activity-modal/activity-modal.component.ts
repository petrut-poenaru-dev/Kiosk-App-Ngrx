import {Component, OnDestroy, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {PriceFormatPipe} from "../../pipes/price-format.pipe";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {StoreStateInterface} from "../../store/index";
import {closeActivityModal, closeAllModals} from "../../store/app.actions";
import {selectCloseTimeLeft} from "../../settings/settings.selectors";
import {BehaviorSubject, Observable, Subject, takeUntil} from "rxjs";
import {getTimeLeft} from "../../settings/settings.actions";
import {BundleSettingsInterface} from "../../interfaces/bundle-settings.interface";

@Component({
  selector: 'app-activity-modal',
  templateUrl: 'activity-modal.component.html',
  styleUrls: ['activity-modal.component.scss'],
  imports: [CommonModule, TranslateModule, PriceFormatPipe],
  standalone: true,
})
export class ActivityModalComponent implements OnInit,OnDestroy{
  public closeTimeLeft$:Observable<number> = this._store.select(selectCloseTimeLeft)
  public closeTimeLeftValue$:BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public closeActivityInterval!:any
  private _destroy$:Subject<void> = new Subject<void>()

  constructor(private _router:Router , private _store: Store<StoreStateInterface>) {}

   public ngOnInit(): void {
    this._store.dispatch(getTimeLeft());
      this.closeTimeLeft$
        .pipe(takeUntil(this._destroy$))
        .subscribe(value => {
        this.closeTimeLeftValue$.next(value);
      })
     this.closeActivityInterval = setInterval(() => {
       if(this.closeTimeLeftValue$.value > 0){
         this.closeTimeLeftValue$.next(this.closeTimeLeftValue$.value - 1);
       }else{
         this.closeModal();
       }
     },1000)
  }

  public closeModal(): void{
    this._store.dispatch(closeActivityModal());
    this._router.navigate(['/language']).then();
  }

  public continue(): void{
    this._store.dispatch(closeAllModals());
  }

  public ngOnDestroy(): void {
    this._destroy$.next()
    this._destroy$.complete()
    clearInterval(this.closeActivityInterval);
  }
}
