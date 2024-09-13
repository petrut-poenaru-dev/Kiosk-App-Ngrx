import {Component} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AppService} from "../../services/app.service";
import {ProductsInterface} from "../../interfaces/products.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {categoryInitialization} from "../../helpers/app-initializations";
import {PriceFormatPipe} from "../../pipes/price-format.pipe";
import {Store} from "@ngrx/store";
import {appActions} from "../../store/index";

@Component({
  selector: 'app-category-menu',
  templateUrl: 'category-menu.component.html',
  styleUrls: ['category-menu.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslateModule , PriceFormatPipe]
})
export class CategoryMenuComponent {
  public categorySection: ProductsInterface = categoryInitialization
  public isCoffeePage = false;
  public title = '';

  constructor(private _appService: AppService , private route: ActivatedRoute , private _router:Router , private _store:Store) {
  }

  public ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.getCategoryProduct(params.get('title'));
      if(params.get('title') === 'Cafea, Ceai, Ciocolata'){
        this.isCoffeePage = true;
      }
    });
  }

  public getCategoryProduct(title: string | null) {
    this._appService.getProducts()
      .subscribe(response => {
        this.categorySection = <ProductsInterface>response.find((product) => product.title === title);
      })
  }

  public openProductDetailsModal(category:string , id:number){
    this._store.dispatch(appActions.openProductDetailsModal({category, id}))
  }

  public openBasket(){
    this._store.dispatch(appActions.openBasketModal())
  }

  public backToMenu(){
    this._router.navigate(['/menu']).then();
  }

}
