import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
    //{ path: 'login', component: LoginComponent }

];

export const appRoutingModule = RouterModule.forRoot(routes);

@NgModule({
    imports: [
      CommonModule,
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule.forRoot(routes, {
        useHash: false,
      }),
    ],
    exports: [],
  })
  export class AppRoutingModule {}
  