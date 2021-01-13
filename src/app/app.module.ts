import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { Routes, RouterModule } from "@angular/router";
import { HomeModule } from "./modules/home/home/home.module";
import { HttpClientModule } from "@angular/common/http";
import { AccountModule } from "./modules/home/account/account.module";
import { AdminModule } from "./modules/admin/admin.module";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


const appRoutes: Routes = [
  { path: "", loadChildren: "./modules/home/home/home.module#HomeModule" },
  { path: "account", loadChildren: "./modules/home/account/account.module#AccountModule" },
  { path: "admin", loadChildren: "./modules/admin/admin.module#AdminModule" }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    SweetAlert2Module.forRoot(),
    RouterModule.forRoot(appRoutes, { scrollPositionRestoration: "enabled", useHash: true })
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule {}
