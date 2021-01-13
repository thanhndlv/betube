import { HomeService } from "./../../../../_core/service/home.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UserLogin } from "./../../../../_core/model/master-model";
import { configs } from "./../../../../_core/config";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  //Form login
  loginForm: FormGroup;
  error: string;
  user = new UserLogin();
  logo = "assets/home/images/Logo.png";

  constructor(private homeService: HomeService, private router: Router) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      userName: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(50)
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(50)
      ])
    });
  }

  signIn() {
    this.user.taiKhoan = this.loginForm.get("userName").value;
    this.user.matKhau = this.loginForm.get("password").value;
    this.homeService.postSignIn(this.user).subscribe(
      res => {
        if (res.maLoaiNguoiDung == configs.userType.customer) {
          localStorage.setItem("user", JSON.stringify(res));
          this.router.navigate(["/"]);
        } else {
          localStorage.setItem("userAdmin", JSON.stringify(res));
          this.router.navigate(["/admin/film"]);
        }
      },
      error => {
        this.error = error.error;
        console.log(error);
      }
    );
  }
}
