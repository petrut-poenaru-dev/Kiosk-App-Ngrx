import {Component, HostListener, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CategoryProductInterface} from "../../interfaces/category-product.interface";
import {ModalService} from "../../services/modal.service";
import {TranslateModule} from "@ngx-translate/core";
import {PriceFormatPipe} from "../../pipes/price-format.pipe";
import {Router} from "@angular/router";

@Component({
  selector: 'app-basket-modal',
  templateUrl: 'basket-modal.component.html',
  styleUrls: ['basket-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslateModule, PriceFormatPipe]
})
export class BasketModalComponent implements OnInit {
  public basket!: Array<CategoryProductInterface>;
  public totalPrice: number = 0;

  constructor(private _modalService: ModalService, private _router: Router) {
  }

  @HostListener('document:keydown', ['$event'])
  public onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.closeModal();
    }
  }

  public closeModal(): void{
    this._modalService.closeModal();
  }

  ngOnInit(): void {
    this._modalService.basket$.subscribe(basket => {
      this.basket = basket;
      basket.forEach(item => {
        this.totalPrice += (item.price * item.quantity);
      })
    })
  }

  public openDeleteFromBasketModal(productId:number): void{
    this._modalService.openDeleteProductModal(productId);
  }

  public increaseQuantity(index:number): void{
    this.basket[index].quantity++;
    this.totalPrice += this.basket[index].price;
  }

  public decreaseQuantity(index:number): void{
    if(this.basket[index].quantity !== 1) {
      this.basket[index].quantity--;
      this.totalPrice -= this.basket[index].price;
    }
  }

  public openCancelOrderModal(): void {
    this._modalService.openCancelOrderModal();
  }

  public addNow() {
    this._router.navigate(['/menu']).then();
    this.closeModal();
  }

  public goToPay(){
    this._router.navigate(['/payment-menu']).then();
    this.closeModal();
  }
}
