import { HomeService } from "./../../../_core/service/home.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BookingTicket, ListTicket } from "../../../_core/model/master-model";
import * as $ from "jquery";

@Component({
  selector: "app-ticket",
  templateUrl: "./ticket.component.html",
  styleUrls: ["./ticket.component.css"]
})
export class TicketComponent implements OnInit {
  showTimeID: string;
  listSeat: any;
  listNormalSeat: any;
  listVIPSeat: any;
  listTicket: ListTicket[] = [];
  bookingObj: BookingTicket = new BookingTicket();
  totalAmount = 0;
  filmInfo: any;
  isLoading = true;
  isMobile = false;
  constructor(
    private activeRoute: ActivatedRoute,
    private _homeService: HomeService,
    private router: Router
  ) {}

  ngOnInit() {
    let width = window.innerWidth;
    if (width < 576) {
      this.isMobile = true;
    }
    let user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      this.router.navigate(["/account/login"]);
    }
    this.activeRoute.params.subscribe(
      result => {
        this.showTimeID = result.showTimeID;
        this.getListTicketRoom();
      },
      error => {
        console.log(error);
      }
    );
  }

  getListTicketRoom() {
    this._homeService.getListTicketRoom(this.showTimeID).subscribe(res => {
      this.filmInfo = res.thongTinPhim;
      this.listSeat = res.danhSachGhe;
      this.listNormalSeat = this.listSeat.filter(x => x.loaiGhe == "Thuong");
      this.listVIPSeat = this.listSeat.filter(x => x.loaiGhe == "Vip");
      this.isLoading = false;
    });
  }

  booking(event: any, seat: any) {
    if (seat.daDat) {
      return;
    }
    let className = event.target.className;
    let id = event.target.id;
    if (!className.includes("bg-success")) {
      $("#" + id).addClass("bg-success");
      let ticket = new ListTicket();
      ticket.maGhe = id;
      ticket.giaVe = seat.giaVe;
      this.listTicket.push(ticket);
      this.totalAmount = this.totalAmount + seat.giaVe;
    } else {
      $("#" + id).removeClass("bg-success");
      let index = this.listTicket.findIndex(x => x.maGhe == id);
      this.listTicket.splice(index, 1);
      this.totalAmount = this.totalAmount - seat.giaVe;
    }
  }

  bookingTicket() {
    let user = JSON.parse(localStorage.getItem("user"));
    let token = user.accessToken;
    if (this.listTicket) {
      this.bookingObj.danhSachVe = this.listTicket;
    }
    this.bookingObj.maLichChieu = this.filmInfo.maLichChieu;
    this.bookingObj.taiKhoanNguoiDung = user.taiKhoan;
    this._homeService.postBookingTicket(this.bookingObj, token).subscribe(
      res => {
        $("#showAlertAddSuccess").click();
        this.getListTicketRoom();
        this.totalAmount = 0;
        this.listTicket = [];
      },
      error => {
        console.log(error);
      }
    );
  }
}
