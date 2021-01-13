import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminComponent } from "./admin.component";
import { Routes, RouterModule } from "@angular/router";
import { UserComponent } from "./user/user.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { DataTablesModule } from "angular-datatables";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import { FilmComponent } from "./film/film.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ShowTimeComponent } from "./show-time/show-time.component";

const adminRoutes: Routes = [
  {
    path: "",
    component: AdminComponent,
    children: [
      { path: "user", component: UserComponent },
      { path: "film", component: FilmComponent },
      { path: "film/show-time/:id", component: ShowTimeComponent },
      { path: "", redirectTo: "/admin/film" },
    ]
  }
];

@NgModule({
  declarations: [
    AdminComponent,
    UserComponent,
    FilmComponent,
    ShowTimeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DataTablesModule,
    SweetAlert2Module,
    NgbModule,
    RouterModule.forChild(adminRoutes)
  ]
})
export class AdminModule {}
