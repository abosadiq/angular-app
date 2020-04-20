import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SignupComponent } from "./components/forms/signup/signup.component";
import { LoginComponent } from "./components/forms/login/login.component";
import { HomepageComponent } from "./components/homepage/homepage.component";
import { ProductlistComponent } from "./components/productlist/productlist.component";
import { AuthGuard } from "./components/auth/auth";
import { ProductdetailsComponent } from "./components/productdetails/productdetails.component";
import { CompareProductsComponent } from './components/compare-products/compare-products.component';

const routes: Routes = [
  { path: "", component: HomepageComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "register", component: SignupComponent },
  {
    path: "product",
    component: ProductlistComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "productdetails",
    component: ProductdetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "compare-products",
    component: CompareProductsComponent,
    canActivate: [AuthGuard],
  },

  // otherwise redirect to home
  { path: "**", redirectTo: "" },
];

export const jooleRouting = RouterModule.forRoot(routes);
