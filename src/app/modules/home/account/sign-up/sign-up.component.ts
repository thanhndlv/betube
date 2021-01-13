import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HomeService } from "./../../../../_core/service/home.service";
import { UserInfo, UserLogin } from "./../../../../_core/model/master-model";
import { configs } from "./../../../../_core/config";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.css"]
})
export class SignUpComponent implements OnInit {
  logo = "assets/home/images/Logo.png";
  isEqual = true; //biến check xem 2 password có giống nhau không
  userInfo = new UserInfo();
  userLogin = new UserLogin();
  error: string;
  signUpForm: any;

  constructor(private homeService: HomeService, private router: Router) {}

  ngOnInit() {
    this.signUpForm = new FormGroup({
      fullName: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(50)
      ]),
      userName: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(50)
      ]),
      phoneNumber: new FormControl("", [
        Validators.required,
        Validators.pattern("^(09|03|08|07|05)[0-9]{8}") //Kiểm tra đây có phải số điện thoại của các nhà mạng Việt Nam không
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(50)
      ]),
      passwordConfirm: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(50)
      ]),
      email: new FormControl("", [Validators.required, Validators.email])
    });
  }

  signUp() {
    this.userInfo.hoTen = this.signUpForm.get("fullName").value;
    this.userInfo.taiKhoan = this.signUpForm.get("userName").value;
    this.userInfo.soDt = this.signUpForm.get("phoneNumber").value;
    this.userInfo.matKhau = this.signUpForm.get("password").value;
    this.userInfo.maNhom = configs.groupID;
    this.userInfo.maLoaiNguoiDung = configs.userType.customer;
    this.userInfo.email = this.signUpForm.get("email").value;

    this.homeService.postSignUp(this.userInfo).subscribe(
      res => {
        this.userLogin.taiKhoan = this.userInfo.taiKhoan;
        this.userLogin.matKhau = this.userInfo.matKhau;
        this.homeService.postSignIn(this.userLogin).subscribe(
          res => {
            localStorage.setItem("user", JSON.stringify(res));
            this.router.navigate(["/"]);
          },
          error => {
            this.error = error.error;
            console.log(error);
          }
        );
      },
      error => {
        console.log(error);
        this.error = error.error;
      }
    );
  }

  //So sánh xem password và password nhập lần 2 có giống nhau không
  comparePassword(value: string, isPasswordField = "true") {
    if (isPasswordField == "true") {
      if (value == this.signUpForm.get("passwordConfirm").value) {
        this.isEqual = true;
      } else {
        this.isEqual = false;
      }
    } else {
      if (value == this.signUpForm.get("password").value) {
        this.isEqual = true;
      } else {
        this.isEqual = false;
      }
    }
  }
}
