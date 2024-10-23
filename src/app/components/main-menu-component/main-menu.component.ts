import {Component, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {AppService} from "../../services/app.service";
import {Router} from "@angular/router";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector:'app-main-menu',
  templateUrl:'main-menu.component.html',
  styleUrls:['main-menu.component.scss'],
  standalone:true,
  imports:[CommonModule , TranslateModule]
})

export class MainMenuComponent implements OnInit{
    public mainSections!: Array<string>;
    public icons:Array<string> = ['icon-drinks' , 'icon-coffee' , 'icon-ice-cream' , 'icon-cake' , 'icon-fresh-juices']
    private _destroy$:Subject<void> = new Subject<void>()
    constructor(private _appService:AppService , private _router:Router) {
    }

    public ngOnInit() {
      this._appService.getProducts()
        .pipe(takeUntil(this._destroy$))
        .subscribe(response => {
          this.mainSections = response.map((product) => product.title);
      })
    }


  public goToSection(section:string){
    this._router.navigate([`category-menu/${section}`]);
  }

  ngOnDestroy(): void {
    this._destroy$.next()
    this._destroy$.complete()
  }
}
