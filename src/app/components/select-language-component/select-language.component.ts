import {Component} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslateService} from "@ngx-translate/core";
import {AppService} from "../../services/app.service";

import {Router} from "@angular/router";
import {BundleSettingsInterface} from "../../interfaces/bundle-settings.interface";

@Component({
  selector: 'app-select-language',
  templateUrl: 'select-language.component.html',
  styleUrls: ['select-language.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class SelectLanguageComponent {

  constructor(private _translate: TranslateService, private _appService: AppService, private _router: Router) {
  }

  public bundleSettings: BundleSettingsInterface = {languages: [{code: "", name: ""}, {code: "", name: ""}]}

  ngOnInit() {
    this.getBundleSettings();
  }

  public getBundleSettings(): void {
    this._appService.getBundleSettings().subscribe(response => {
      this.bundleSettings = response;
    })
  }

  public selectLanguage(language: string): void {
    this._translate.use(language)
    this._router.navigate(['/menu']).then();
  }
}
