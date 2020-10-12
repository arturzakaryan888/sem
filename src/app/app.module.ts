import {BrowserModule} from '@angular/platform-browser';
import {Inject, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PreloaderComponent} from './components/preloader/preloader.component';
import {AuthorizedComponent} from './pages/authorized/authorized.component';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpHeaders} from "@angular/common/http";

import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from "rxjs";
import {environment} from "../environments/environment";
import {TableComponent} from './components/table/table.component';
import {ButtonWithIconComponent} from './components/button-with-icon/button-with-icon.component';
import {TableRowComponent} from './components/table/table-row/table-row.component';
import {TableItemComponent} from './components/table/table-item/table-item.component';
import {HeaderComponent} from './components/header/header.component';
import {HeaderItemComponent} from './components/header/header-item/header-item.component';
import {Store, StoreModule} from '@ngrx/store';

import {reducers, metaReducers} from './reducers';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { PlaceEffects } from './reducers/place/place.effects';
import { EditableFieldComponent } from './components/editable-field/editable-field.component';
import {FormsModule} from "@angular/forms";
import { SelectBoxComponent } from './components/select-box/select-box.component';
import { SelectOptionComponent } from './components/select-box/select-option/select-option.component';

import { OnlynumberDirective } from './directives/onlynnumber.directive';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './components/pagination/pagination.component';
import { PaginationItemComponent } from './components/pagination/pagination-item/pagination-item.component';
@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {

  constructor(
    @Inject('BASE_API_URL') private baseUrl: string) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiReq = request.clone({url: `${this.baseUrl}/${request.url}`});
    return next.handle(apiReq);
  }
}


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userToken = localStorage.getItem('sem_token');
    let modifiedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${userToken}`,),
    });
    return next.handle(modifiedReq);
  }
}


@NgModule({
  declarations: [
    AppComponent,
    PreloaderComponent,
    AuthorizedComponent,
    TableComponent,
    ButtonWithIconComponent,
    TableRowComponent,
    TableItemComponent,
    HeaderComponent,
    HeaderItemComponent,
    EditableFieldComponent,
    SelectBoxComponent,
    SelectOptionComponent,
    OnlynumberDirective,
    PaginationComponent,
    PaginationItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot(reducers, {
      metaReducers, runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
      }
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([PlaceEffects]),
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    {provide: "BASE_API_URL", useValue: environment.apiUrl, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
