import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login/login.component";
import { AccountComponent } from "./account.component";
import { Routes, RouterModule } from "@angular/router";
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

const accRoutes: Routes = [
  {
    path: "",
    component: AccountComponent,
    children: [
      {
        path: "login",
        component: LoginComponent
      },
      {
        path: "sign-up",
        component: SignUpComponent
      }
    ]
  }
];

@NgModule({
  declarations: [LoginComponent, AccountComponent, SignUpComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule.forChild(accRoutes)]
})
export class AccountModule {}
