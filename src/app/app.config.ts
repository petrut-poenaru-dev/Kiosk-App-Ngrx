import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';
import {HttpClient, provideHttpClient} from '@angular/common/http';

import { routes } from './app.routes';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import { provideStore } from '@ngrx/store';
import {appReducer} from "./store/app.reducer";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http,'./assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient(), importProvidersFrom(TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    })), provideStore({app:appReducer}) ,
    importProvidersFrom(
      StoreDevtoolsModule.instrument({
        maxAge: 25,
        autoPause: true,
      })
    )],
};
