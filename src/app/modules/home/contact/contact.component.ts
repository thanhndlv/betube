import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  name: string;
  email: string;
  phone: string;
  message: string;
  constructor(private titleService:Title) {
    this.titleService.setTitle("Trang liên hệ");
    
  }

  ngOnInit() {
  }
  processForm() {
    const allInfo = `My name is ${this.name}. My email is ${this.email}. My phone is ${this.phone}. My message is ${this.message}`;
    alert(allInfo); 
  }

}
