import { Title } from "@angular/platform-browser";
import { Component, OnInit } from "@angular/core";
import { HomeService } from "../../../_core/service/home.service";
import { NgbCarouselConfig } from "@ng-bootstrap/ng-bootstrap";
import { NgbRatingConfig } from "@ng-bootstrap/ng-bootstrap";
import * as $ from "jquery";
//import được là nhờ install thư viện @types/slick-carousel, tham khảo tại https://hackernoon.com/how-to-use-javascript-libraries-in-angular-2-apps-ff274ba601af
import "slick-carousel";
import { FormControl, FormGroup } from "@angular/forms";


@Component({
  selector: "app-index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.css"]
})
export class IndexComponent implements OnInit {
  
  // List Data
  listFilms: any[] = [];
  listSystemTheaters: any[] = [];
  listTheaters: any[] = [];
  listFilmsOfTheater: any;
  listShowTimeOfFilm: any[] = [];
  listDate: any[] = [];
  listTime: any[] = [];

  //Form đặt vé nhanh
  fastBookingForm = new FormGroup({
    sltSystem: new FormControl(""),
    sltTheater: new FormControl(""),
    sltFilm: new FormControl(""),
    sltDate: new FormControl(""),
    sltTime: new FormControl("")
  });

  showTimeID: any;
  systemTheaterID: string;
  theaterID: string;
  isInitShowTime: boolean = true;
  isMobile = false;

  constructor(
    private _homeService: HomeService,
    config: NgbCarouselConfig,
    configRating: NgbRatingConfig,
    private titleService: Title
  ) {
    this.titleService.setTitle("Be tube - Đặt vé phim nhanh nhất");
    //Cài đặt rating
    configRating.max = 5;
    configRating.readonly = true;
  }

  ngOnInit() {
    let width = window.innerWidth;
    if(width < 576){
      this.isMobile = true;
    }
    //Lấy lên danh sách film theo nhóm GP01 để show lên mục phim đang chiếu - sắp chiếu
    this._homeService.getListFilms().subscribe(
      listFilms => {
        this.listFilms = listFilms;
      },
      error => {
        console.log(error.error);
      }
    );

    //Lấy danh sách hệ thống rạp
    this._homeService.getListSystemTheaters().subscribe(
      listSystemTheaters => {
        this.listSystemTheaters = listSystemTheaters;
        this.showTheaters(this.listSystemTheaters[0].maHeThongRap, 1);
      },
      error => {
        console.log(error.error);
      }
    );
  }

  // Lấy danh sách các cụm rạp sau khi chọn hệ thống rạp
  showTheaters(systemTheaterID: string, type: number = 0) {
    if (type == 0) {
      //Reset lại select Rạp, Phim, Ngày xem, Suất chiếu nếu khách hàng đã chọn trước đó
      if (this.listTheaters.length > 0) {
        this.listFilmsOfTheater = [];
        this.listDate = [];
        this.listTime = [];
        this.fastBookingForm.controls["sltTheater"].setValue("");
        this.fastBookingForm.controls["sltFilm"].setValue("");
        this.fastBookingForm.controls["sltDate"].setValue("");
        this.fastBookingForm.controls["sltTime"].setValue("");
      }
      this._homeService.getListTheaters(systemTheaterID).subscribe(
        listTheaters => {
          this.listTheaters = listTheaters;
        },
        error => {
          console.log(error.error);
        }
      );
    } else {
      if (!this.isInitShowTime) {
        this.systemTheaterID = systemTheaterID;
        this._homeService.getListTheaters(systemTheaterID).subscribe(
          listTheaters => {
            this.listTheaters = listTheaters;
          },
          error => {
            console.log(error.error);
          }
        );
      } else {
        this.isInitShowTime = false;
        this.systemTheaterID = systemTheaterID;
        this._homeService.getListTheaters(systemTheaterID).subscribe(
          listTheaters => {
            this.listTheaters = listTheaters;
            this.showFilmsOfTheater(this.listTheaters[0].maCumRap, 1);
          },
          error => {
            console.log(error.error);
          }
        );
      }
    }
  }

  //Lấy danh sách các phim của cụm rạp đã chọn
  showFilmsOfTheater(theaterID: string, type: number = 0) {
    if (type == 0) {
      if (this.listFilmsOfTheater) {
        this.listFilmsOfTheater = [];
        this.listDate = [];
        this.listTime = [];
        this.fastBookingForm.controls["sltFilm"].setValue("");
        this.fastBookingForm.controls["sltDate"].setValue("");
        this.fastBookingForm.controls["sltTime"].setValue("");
      }
      this._homeService
        .getListTheatersShowtimes(
          this.fastBookingForm.controls["sltSystem"].value
        )
        .subscribe(
          listTheatersShowtimes => {
            let listTheaters: any[] = listTheatersShowtimes[0].lstCumRap;
            let hasShowTime = listTheaters.find(x => x.maCumRap == theaterID);
            if (hasShowTime) {
              this.listFilmsOfTheater = hasShowTime.danhSachPhim;
              console.log(this.listFilmsOfTheater);
            }
          },
          error => {
            console.log(error.error);
          }
        );
    } else {
      if (!this.isInitShowTime) {
        this.theaterID = theaterID;
        this._homeService
          .getListTheatersShowtimes(this.systemTheaterID)
          .subscribe(
            listTheatersShowtimes => {
              let listTheaters: any[] = listTheatersShowtimes[0].lstCumRap;
              let hasShowTime = listTheaters.find(x => x.maCumRap == theaterID);
              if (hasShowTime) {
                this.listFilmsOfTheater = hasShowTime.danhSachPhim;
              }
            },
            error => {
              console.log(error.error);
            }
          );
      } else {
        this.isInitShowTime = false;
      }
    }
  }

  //Show các ngày chiếu của phim đã chọn
  showDate(filmID: string) {
    if (this.listDate) {
      this.listDate = [];
      this.listTime = [];
      this.fastBookingForm.controls["sltDate"].setValue("");
      this.fastBookingForm.controls["sltTime"].setValue("");
    }
    let listShowTimeOfFilm = this.listFilmsOfTheater.find(
      x => x.maPhim == filmID
    ).lstLichChieuTheoPhim;
    let listDate = listShowTimeOfFilm.map((showtime, index) => {
      return showtime.ngayChieuGioChieu.substring(0, 10);
    });
    this.listDate = [...new Set(listDate)];
  }

  //Show các suất chiếu của ngày đã chọn
  showShowTime(date: string, type: number = 0) {
    if (type == 0) {
      if (this.listTime) {
        this.listTime = [];
        this.fastBookingForm.controls["sltTime"].setValue("");
      }
      let listShowTimeOfFilm = this.listFilmsOfTheater.find(
        x => x.maPhim == this.fastBookingForm.controls["sltFilm"].value
      ).lstLichChieuTheoPhim;
      this.listTime = listShowTimeOfFilm.filter(
        x => x.ngayChieuGioChieu.substring(0, 10) == date
      );
      this.listTime = this.listTime.map((x, index) => {
        return {
          time: x.ngayChieuGioChieu.substring(11, 16),
          showTimeID: x.maLichChieu
        };
      });
      console.log(this.listTime);
    } else {
      this.listShowTimeOfFilm = this.listFilmsOfTheater.find(
        x => x.maPhim == date
      ).lstLichChieuTheoPhim;
      this.listShowTimeOfFilm = this.listShowTimeOfFilm.map((x, index) => {
        return x.ngayChieuGioChieu;
      });
    }
  }
  setShowTimeID(showTimeID: any) {
    this.showTimeID = showTimeID;
  }

  //Image banner
  images = [
    "../../../../assets/home/images/banner/FrozenII.jpg",
    "../../../../assets/home/images/banner/Joker.jpg",
    "../../../../assets/home/images/banner/Endgame.jpg"
  ];

  //Cài đặt Slick slider
  slideConfig = { slidesToShow: 5, slidesToScroll: 5, prevArrow: '<button style="position: absolute;top: 50%;left: -3%;border: none;background: none;transform: translate(0, -50%);outline: none;color: #3e515d;" class="prev-arrow"><i class="fas fa-chevron-left fa-2x"></i></button>',nextArrow: '<button style="position: absolute;top: 50%;right: -3%;border: none;background: none;transform: translate(0, -50%);outline: none;color: #3e515d;" class="prev-arrow"><i class="fas fa-chevron-right fa-2x"></i></button>'};
  slideConfigMobile = { slidesToShow: 1, slidesToScroll: 1, prevArrow: '<button style="position: absolute;top: 50%;left: -3%;border: none;background: none;transform: translate(0, -50%);outline: none;color: #3e515d;" class="prev-arrow"><i class="fas fa-chevron-left fa-2x"></i></button>',nextArrow: '<button style="position: absolute;top: 50%;right: -3%;border: none;background: none;transform: translate(0, -50%);outline: none;color: #3e515d;" class="prev-arrow"><i class="fas fa-chevron-right fa-2x"></i></button>'};
}
