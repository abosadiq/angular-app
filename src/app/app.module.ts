import { ProductListService } from "./components/services/list.service";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FakeBackendInterceptor } from "./components/api/backend";
import { ErrorInterceptor } from "./components/api/erros.interceptor";
import { JwtInterceptor } from "./components/api/jwt";
import { AppComponent } from "./app.component";
import { SignupComponent } from "./components/forms/signup/signup.component";
import { LoginComponent } from "./components/forms/login/login.component";
import { jooleRouting } from "./app-routing";
import { AlertComponent } from "./components/alert/alert.component";
import { HomepageComponent } from "./components/homepage/homepage.component";
import { ProductlistComponent } from "./components/productlist/productlist.component";
import { LogoComponent } from "./components/logo/logo.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { SearchbarComponent } from "./components/searchbar/searchbar.component";
import { ProductdetailsComponent } from "./components/productdetails/productdetails.component";
import { Ng5SliderModule } from "ng5-slider";
import { CompareProductsComponent } from './components/compare-products/compare-products.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    AlertComponent,
    HomepageComponent,
    ProductlistComponent,
    LogoComponent,
    NavbarComponent,
    SearchbarComponent,
    ProductdetailsComponent,
    CompareProductsComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    jooleRouting,
    Ng5SliderModule,
    //NgbdCollapseBasicModule,
  ],
  providers: [
    ProductListService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    FakeBackendInterceptor,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
