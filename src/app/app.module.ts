import { BrowserModule } from '@angular/platform-browser';
import {Inject, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PreloaderComponent } from './components/preloader/preloader.component';
import { AuthorizedComponent } from './pages/authorized/authorized.component';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpHeaders} from "@angular/common/http";

import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from "rxjs";
import {environment} from "../environments/environment";
import { TableComponent } from './components/table/table.component';
import { ButtonWithIconComponent } from './components/button-with-icon/button-with-icon.component';
import { TableRowComponent } from './components/table/table-row/table-row.component';
import { TableItemComponent } from './components/table/table-item/table-item.component';
import { HeaderComponent } from './components/header/header.component';
import { HeaderItemComponent } from './components/header/header-item/header-item.component';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {

  constructor(
    @Inject('BASE_API_URL') private baseUrl: string) {
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiReq = request.clone({ url: `${this.baseUrl}/${request.url}` });
    return next.handle(apiReq);
  }
}


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userToken = localStorage.getItem('sem_token');
    let modifiedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${userToken}`, ),
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
    HeaderItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    { provide: "BASE_API_URL", useValue: environment.apiUrl, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
