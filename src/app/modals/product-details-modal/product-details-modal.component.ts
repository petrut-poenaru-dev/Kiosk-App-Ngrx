import {Component, HostListener, OnInit} from "@angular/core";
import {ModalService} from "../../services/modal.service";
import {AppService} from "../../services/app.service";
import {CategoryProductInterface} from "../../interfaces/category-product.interface";
import {ProductsInterface} from "../../interfaces/products.interface";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {PriceFormatPipe} from "../../pipes/price-format.pipe";

@Component({
  selector: 'app-product-details',
  templateUrl: 'product-details-modal.component.html',
  styleUrls: ['product-details-modal.component.scss'],
  imports: [CommonModule, TranslateModule, PriceFormatPipe],
  standalone: true,
})
export class ProductDetailsModalComponent implements OnInit {
  public productCategory$ = this._modalService.productCategory$;
  public productId$ = this._modalService.productId$;
  public product!: CategoryProductInterface;
  public categorySection!: ProductsInterface;

  constructor(private _modalService: ModalService, private _appService: AppService) {
  }

  @HostListener('document:keydown', ['$event'])
  public onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.closeModal();
    }
  }

  public ngOnInit(): void {
    this.getProduct();
  }

  public closeModal(): void {
    this._modalService.closeModal();
  }

  public getProduct() {
    this._appService.getProducts().subscribe(response => {
      this.categorySection = <ProductsInterface>response.find((product) => product.title === this.productCategory$.value);
      this.product = <CategoryProductInterface>this.categorySection.buttons.find((product) => product.id === this.productId$.value);
    })
  }

  public addToBasket() {
    this._modalService.addProductToBasket(this.product);
    this._modalService.closeModal();
  }

}
