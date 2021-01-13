import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AdminService } from "./../../../_core/service/admin.service";
import { UserInfo, UserLogin } from "../../../_core/model/master-model";
import { configs } from "../../../_core/config";
import * as $ from "jquery";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent implements OnInit {
  isEqual = true; //biến check xem 2 password có giống nhau không
  userInfo = new UserInfo();
  userLogin = new UserLogin();
  error: string;
  addUserForm: any;
  listUser: any;
  userNameDelete: any;
  formTitle: string;
  isEdit = false;
  searchResult: any;
  inputSearchUser = "";
  isMobile = false;
  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit() {
    let width = window.innerWidth;
    if (width < 576) {
      this.isMobile = true;
    }
    this.createForm();
    this.getListUserPaginate(1);
  }

  //Hàm này dùng để truyền tổng số trang vào, sau đó chuyển nó thành mảng với số phần tử bằng với số trang để sử dụng được *ngFor
  counter(i: number) {
    return new Array(i);
  }

  createForm() {
    this.addUserForm = new FormGroup({
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
      email: new FormControl("", [Validators.required, Validators.email]),
      userType: new FormControl("KhachHang", Validators.required)
    });
  }

  searchUser() {
    this.adminService.getSearchUser(this.inputSearchUser).subscribe(
      res => {
        this.searchResult = res;
      },
      error => {
        console.log(error.error);
      }
    );
  }

  addUser() {
    this.userInfo.hoTen = this.addUserForm.get("fullName").value;
    this.userInfo.taiKhoan = this.addUserForm.get("userName").value;
    this.userInfo.soDt = this.addUserForm.get("phoneNumber").value;
    this.userInfo.matKhau = this.addUserForm.get("password").value;
    this.userInfo.maNhom = configs.groupID;
    this.userInfo.maLoaiNguoiDung = this.addUserForm.get("userType").value;
    this.userInfo.email = this.addUserForm.get("email").value;
    let token = JSON.parse(localStorage.getItem("userAdmin"));
    this.adminService.postAddUser(this.userInfo, token.accessToken).subscribe(
      res => {
        this.getListUserPaginate(this.listUser.currentPage);
        $(".close").click();
        $("#showAlertAddSuccess").click();
      },
      error => {
        this.error = error.error;
      }
    );
  }

  setUpAddUser() {
    this.addUserForm.reset();
    this.formTitle = "Thêm người dùng mới";
    this.isEdit = false;
  }

  editUser(userName: any) {
    this.addUserForm.reset();
    this.formTitle = "Chỉnh sửa thông tin người dùng";
    this.isEdit = true;
    this.adminService.getSearchUser(userName).subscribe(
      res => {
        this.userInfo = res[0];
        this.addUserForm.controls["fullName"].setValue(this.userInfo.hoTen);
        this.addUserForm.controls["userName"].setValue(this.userInfo.taiKhoan);
        this.addUserForm.controls["phoneNumber"].setValue(this.userInfo.soDt);
        this.addUserForm.controls["userType"].setValue(
          this.userInfo.maLoaiNguoiDung
        );
        this.addUserForm.controls["password"].setValue(this.userInfo.matKhau);
        this.addUserForm.controls["passwordConfirm"].setValue(
          this.userInfo.matKhau
        );
        this.addUserForm.controls["email"].setValue(this.userInfo.email);
      },
      error => {}
    );
  }

  confirmEdit() {
    this.userInfo.hoTen = this.addUserForm.get("fullName").value;
    this.userInfo.taiKhoan = this.addUserForm.get("userName").value;
    this.userInfo.soDt = this.addUserForm.get("phoneNumber").value;
    this.userInfo.matKhau = this.addUserForm.get("password").value;
    this.userInfo.maLoaiNguoiDung = this.addUserForm.get("userType").value;
    this.userInfo.maNhom = configs.groupID;
    this.userInfo.email = this.addUserForm.get("email").value;

    let token = JSON.parse(localStorage.getItem("userAdmin"));
    this.adminService.putUpdateUser(this.userInfo, token.accessToken).subscribe(
      res => {
        if (this.inputSearchUser != "") {
          this.searchUser();
        } else {
          this.getListUserPaginate(this.listUser.currentPage);
        }
        $(".close").click();
        $("#showAlertUpdateSuccess").click();
      },
      error => {
        console.log(error.error);
      }
    );
  }

  deleteUser() {
    let token = JSON.parse(localStorage.getItem("userAdmin"));
    this.adminService
      .deleteUser(this.userNameDelete, token.accessToken)
      .subscribe(
        res => {
          if (this.inputSearchUser != "") {
            this.searchUser();
          } else {
            this.getListUserPaginate(this.listUser.currentPage);
          }
          $("#showAlertDeleteSuccess").click();
        },
        error => {
          console.log(error.error);
        }
      );
  }

  setUserDelete(user: any) {
    this.userNameDelete = user;
  }

  getPage(pageNumber: any) {
    this.getListUserPaginate(pageNumber);
  }

  next() {
    this.getListUserPaginate(this.listUser.currentPage + 1);
  }

  previous() {
    this.getListUserPaginate(this.listUser.currentPage - 1);
  }

  getListUserPaginate(pageNumber: any) {
    this.adminService.getListUserPaginate(pageNumber).subscribe(
      res => {
        this.listUser = res;
      },
      error => {
        console.log(error.error);
      }
    );
  }

  //So sánh xem password và password nhập lần 2 có giống nhau không
  comparePassword(value: string, isPasswordField = "true") {
    if (isPasswordField == "true") {
      if (value == this.addUserForm.get("passwordConfirm").value) {
        this.isEqual = true;
      } else {
        this.isEqual = false;
      }
    } else {
      if (value == this.addUserForm.get("password").value) {
        this.isEqual = true;
      } else {
        this.isEqual = false;
      }
    }
  }
}
