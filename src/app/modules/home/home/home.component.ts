import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user : any;
  logo = "assets/home/images/Logo.png";

  constructor() { }
  ngOnInit() {
    $("body").css({"background-color": "#e9ebee"});
    this.user = localStorage.getItem('user');
    this.user = JSON.parse(this.user)
  }


  logOut() {
    localStorage.removeItem('user');
    this.user = null;
  }

}
