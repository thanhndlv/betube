import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AdminService } from "../../../_core/service/admin.service";
import { HomeService } from "../../../_core/service/home.service";
import { Film, ShowTime } from "../../../_core/model/master-model";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import * as $ from "jquery";

@Component({
  selector: "app-show-time",
  templateUrl: "./show-time.component.html",
  styleUrls: ["./show-time.component.css"]
})
export class ShowTimeComponent implements OnInit {
  listSystemTheaters: any;
  listTheater: any;
  listShowTime: any;
  listRoom: any;
  addShowTimeForm: any;
  showTime = new ShowTime();
  filmID: any;
  token = JSON.parse(localStorage.getItem("userAdmin"));
  accessToken = this.token.accessToken;

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private homeService: HomeService
  ) {}

  ngOnInit() {
    this.addShowTimeForm = new FormGroup({
      date: new FormControl(""),
      time: new FormControl(""),
      theaterID: new FormControl(""),
      ticketPrice: new FormControl("90000")
    });
    this.filmID = this.route.snapshot.params.id;
    this.getListShowtimes();
  }

  getListShowtimes() {
    this.adminService.getListShowtimes(this.filmID).subscribe(
      res => {
        if (res.heThongRapChieu) {
          this.listSystemTheaters = res.heThongRapChieu;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  showTheaters(systemID: string) {
    this.listTheater = this.listSystemTheaters.find(
      x => x.maHeThongRap == systemID
    ).cumRapChieu;
  }

  showShowTimes(theaterID: string) {
    this.listShowTime = this.listTheater.find(
      x => x.maCumRap == theaterID
    ).lichChieuPhim;
  }

  setUpAddShowTime() {
    this.homeService.getListSystemTheaters().subscribe(
      res => {
        this.listSystemTheaters = res;
      },
      error => {
        console.log(error);
      }
    );
  }

  showTheatersAdd(systemID: string) {
    this.homeService.getListTheaters(systemID).subscribe(
      res => {
        this.listTheater = res;
      },
      error => {
        console.log(error);
      }
    );
  }

  showRoomsAdd(theaterID: string) {
    this.listRoom = this.listTheater.find(
      x => x.maCumRap == theaterID
    ).danhSachRap;
  }

  addShowTime() {
    this.showTime.maPhim = this.filmID;
    let date = this.addShowTimeForm.get("date").value;
    let time = this.addShowTimeForm.get("time").value;
    this.showTime.ngayChieuGioChieu = this.getShowTime(date, time);
    this.showTime.maRap = this.addShowTimeForm.get("theaterID").value;
    this.showTime.giaVe = this.addShowTimeForm.get("ticketPrice").value;

    this.adminService
      .postAddShowTime(this.showTime, this.accessToken)
      .subscribe(
        res => {
          $(".close").click();
          $("#showAlertAddSuccess").click();
          this.getListShowtimes();
        },
        error => {
          console.log(error);
        }
      );
    console.log(this.showTime);
  }

  getShowTime(date: any, time: any) {
    let year = date.year;
    let month = date.month;
    let day = date.day;
    let hour = time.hour;
    let minute = time.minute;
    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }
    if (hour < 10) {
      hour = `0${hour}`;
    }
    if (minute < 10) {
      minute = `0${minute}`;
    }
    date = `${day}/${month}/${year} ${hour}:${minute}:00`;
    return date;
  }
}
