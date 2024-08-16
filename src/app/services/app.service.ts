import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BundleSettingsInterface} from "../interfaces/bundle-settings.interface";
import {ProductsInterface} from "../interfaces/products.interface";

@Injectable({
  providedIn:'root'
})
export class AppService{

  constructor(private _http:HttpClient) {}

  public getBundleSettings():Observable<BundleSettingsInterface>{
    return this._http.get<BundleSettingsInterface>('http://localhost:3333/api/bundle');
  }

  public getProducts():Observable<Array<ProductsInterface>>{
    return this._http.get<Array<ProductsInterface>>('http://localhost:3333/api/products');
  }

  public getOrderNumber():Observable<number>{
    return this._http.post<number>('http://localhost:3333/api/orderNumber' , {});
  }
}
