import { HomeService } from "./../../../_core/service/home.service";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { UserInfo, UserLogin } from "../../../_core/model/master-model";
import { first } from "rxjs/operators";
import * as $ from "jquery";
import { configs } from "./../../../_core/config";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-user-detail",
  templateUrl: "./user-detail.component.html",
  styleUrls: ["./user-detail.component.css"]
})
export class UserDetailComponent implements OnInit {
  userForm: any;
  userName: string;
  userInfo: UserInfo = new UserInfo();
  user: any;
  listSeat: any;
  token = JSON.parse(localStorage.getItem("user"));
  bookingHistory: any;
  isLoading = true;
  constructor(
    private _homeService: HomeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.userName = this.route.snapshot.params.userName;
    this.token = this.token.accessToken;
    this.getUserInfo();
  }

  getUserInfo() {
    this._homeService.postCustomerInfo(this.userName, this.token).subscribe(
      res => {
        this.user = res;
        this.bookingHistory = this.user.thongTinDatVe;
        this.bookingHistory = this.bookingHistory.slice(
          this.bookingHistory.length - 3,
          this.bookingHistory.length
        );
        this.userForm = new FormGroup({
          fullName: new FormControl(this.user.hoTen, [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(50)
          ]),
          userName: new FormControl(this.user.taiKhoan, [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(50)
          ]),
          phoneNumber: new FormControl(this.user.soDT, [
            Validators.required,
            Validators.pattern("^(09|03|08|07|05)[0-9]{8}") //Kiểm tra đây có phải số điện thoại của các nhà mạng Việt Nam không
          ]),
          password: new FormControl(this.user.matKhau, [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(50)
          ]),
          email: new FormControl(this.user.email, [
            Validators.required,
            Validators.email
          ])
        });
        this.isLoading = false;
      },
      error => {
        console.log(error);
      }
    );
  }

  updateInfo() {
    let user = JSON.parse(localStorage.getItem("user"));
    let token = user.accessToken;
    this.userInfo.taiKhoan = this.user.taiKhoan;
    this.userInfo.email = this.userForm.get("email").value;
    this.userInfo.hoTen = this.userForm.get("fullName").value;
    this.userInfo.maNhom = configs.groupID;
    this.userInfo.soDt = this.userForm.get("phoneNumber").value;
    this.userInfo.maLoaiNguoiDung = "KhachHang";
    this.userInfo.matKhau = this.userForm.get("password").value;
    this._homeService.putUpdateCustomerInfo(this.userInfo, token).subscribe(
      res => {
        $("#showAlertAddSuccess").click();
        this.getUserInfo();
      },
      error => {
        console.log(error);
      }
    );
  }

  showModal(index: any) {
    this.listSeat = this.bookingHistory[index].danhSachGhe;
  }
}
