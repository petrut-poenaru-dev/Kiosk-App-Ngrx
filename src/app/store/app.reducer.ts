import {CategoryProductInterface} from "../interfaces/category-product.interface";
import {createReducer, on} from "@ngrx/store";
import {appActions} from "./index";

export interface AppStateInterface {
  showProductDetailsModal: boolean,
  showBasketModal: boolean,
  showCancelOrderModal: boolean,
  showDeleteBasketProductModal: boolean,
  showActivityModal: boolean,
  productCategory: string,
  productId: number,
  basket: Array<CategoryProductInterface>,
  totalPrice: number,
}

export const AppInitialState: AppStateInterface = {
  showProductDetailsModal: false,
  showBasketModal: false,
  showCancelOrderModal: false,
  showDeleteBasketProductModal: false,
  showActivityModal: false,
  productCategory: '',
  productId: 0,
  totalPrice: 0,
  basket: []
}
export const appReducer = createReducer<AppStateInterface>(
  AppInitialState,
  on(appActions.initApp, state => ({
    ...state,
  })),
  on(appActions.closeAllModals, state => ({
    ...state,
    showProductDetailsModal: false,
    showBasketModal: false,
    showCancelOrderModal: false,
    showDeleteBasketProductModal: false,
    showActivityModal: false,
    productId: 0,
    productCategory: ''
  })),
  on(appActions.openProductDetailsModal, (state, action) => ({
    ...state,
    showProductDetailsModal: true,
    productCategory: action.category,
    productId: action.id,
  })),
  on(appActions.openBasketModal, state => ({
    ...state,
    showBasketModal: true,
  })),
  on(appActions.cancelOrder, state => ({
    ...state,
    basket: [],
    showCancelOrderModal:false,
    totalPrice:0
  })),
  on(appActions.openCancelOrderModal, state => ({
    ...state,
    showBasketModal: false,
    showCancelOrderModal: true,
  })),
  on(appActions.openRemoveProductFromBasketModal, (state, {productId}) => ({
    ...state,
    productId: productId,
    showBasketModal: false,
    showDeleteBasketProductModal: true,
  })),
  on(appActions.closeRemoveProductFromBasketModal, state =>{
    return {
      ...state,
      showDeleteBasketProductModal:false,
      showBasketModal:true,
    }
  }),
  on(appActions.closeCancelOrderModal, state =>{
    return {
      ...state,
      showCancelOrderModal:false,
      showBasketModal:true,
    }
  }),
  on(appActions.openActivityModal, state =>{
    return {
      ...state,
      showActivityModal:true,
    }
  }),
  on(appActions.closeActivityModal, state =>{
    return {
      ...state,
      showActivityModal:false,
      basket:[],
      totalPrice:0
    }
  }),
  on(appActions.removeProductFromBasket, (state) => {
    const foundElem = state.basket.find((basketProduct: CategoryProductInterface) => basketProduct.id === state.productId);
    if(foundElem){
      return{
        ...state,
        basket: state.basket.filter(product => product.id !== state.productId),
        showBasketModal: true,
        showDeleteBasketProductModal: false,
        totalPrice:state.totalPrice - (foundElem.price * foundElem.quantity)
      }
    }
    else{
      return {
        ...state,
        showBasketModal: true,
        showDeleteBasketProductModal: false,
      }
    }
  }),
  on(appActions.addProductToBasket, (state, {product}) => {
    const foundElem = state.basket.find((basketProduct: CategoryProductInterface) => basketProduct.id === product.id);

    if (foundElem) {
      return {
        ...state,
        basket: state.basket.map(p =>
          p.id === product.id ? {...p, quantity: p.quantity + 1} : p
        ),
        totalPrice: state.totalPrice + product.price,
        showProductDetailsModal: false,
      };
    } else {
      return {
        ...state,
        basket: [...state.basket, {...product, quantity: 1}],
        totalPrice: state.totalPrice + product.price,
        showProductDetailsModal: false,
      };
    }
  }),
  on(appActions.increaseProductQuantity, (state, {productId, productPrice}) => {
    return {
      ...state,
      basket: state.basket.map(p =>
        p.id === productId ? {...p, quantity: p.quantity + 1} : p
      ),
      totalPrice: state.totalPrice + productPrice
    }
  }),
  on(appActions.decreaseProductQuantity, (state, {productId, productPrice}) => {
    return {
      ...state,
      basket: state.basket.map(p =>
        p.id === productId ? {...p, quantity: p.quantity - 1} : p
      ),
      totalPrice: state.totalPrice - productPrice
    }
  })
)
