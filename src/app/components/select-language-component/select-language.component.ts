import {Component, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslateService} from "@ngx-translate/core";
import {AppService} from "../../services/app.service";

import {Router} from "@angular/router";
import {Subject, takeUntil} from "rxjs";
import {Store} from "@ngrx/store";
import {StoreStateInterface} from "../../store/index";
import {selectLanguage} from "../../settings/settings.selectors";

@Component({
  selector: 'app-select-language',
  templateUrl: 'select-language.component.html',
  styleUrls: ['select-language.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class SelectLanguageComponent implements OnInit{
  private _destroy$:Subject<void> = new Subject<void>()
  public languagesObs$ = this._store.select(selectLanguage);
  public languages!:Array<{code:string , name:string}>;
  constructor(private _translate: TranslateService, private _appService: AppService, private _router: Router , private _store:Store<StoreStateInterface>) {
  }

  public ngOnInit(): void {
    this.languagesObs$.pipe(takeUntil(this._destroy$)).subscribe(languages => {
      this.languages = languages
    })
  }

  public ngOnDestroy(): void {
    this._destroy$.next()
    this._destroy$.complete()
  }

  public selectLanguage(language: string): void {
    this._translate.use(language)
    this._router.navigate(['/menu']).then();
  }
}
