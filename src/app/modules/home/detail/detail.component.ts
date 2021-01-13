import { HomeService } from "./../../../_core/service/home.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.css"]
})
export class DetailComponent implements OnInit {
  filmID: string;
  filmDetail: any;
  trailer: string;
  isLoading = true;
  isMobile = false;

  constructor(
    private route: ActivatedRoute,
    private _homeService: HomeService
  ) {}

  ngOnInit() {
    let width = window.innerWidth;
    if (width < 576) {
      this.isMobile = true;
    }
    this.filmID = this.route.snapshot.params.filmID;
    if (this.filmID) {
      this._homeService.getInfoFilm(this.filmID).subscribe(res => {
        this.filmDetail = res;
        let trailer = this.filmDetail.trailer;
        this.trailer = trailer;
        this.isLoading = false;
      });
    }
  }
}
