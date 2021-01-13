import { Component, OnInit } from "@angular/core";
import * as $ from "jquery";
import { Router } from "@angular/router";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})
export class AdminComponent implements OnInit {
  logo = "assets/home/images/Logo.png";
  isMobile = false;

  constructor(public router: Router) {}

  ngOnInit() {
    let user = JSON.parse(localStorage.getItem("userAdmin"));
    if (!user) {
      this.router.navigate(["/account/login"]);
    }
    let width = window.innerWidth;
    if (width < 576) {
      this.isMobile = true;
    }
    $("body").css("background-color", "white");
  }

  signOutAdmin() {
    localStorage.removeItem("userAdmin");
    this.router.navigate["/admin/user"];
  }
}
