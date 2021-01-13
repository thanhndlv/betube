import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, config } from "rxjs";
import { configs } from "../config";
@Injectable({
  providedIn: "root"
})
export class HomeService {
  API_URL = {
    getListFilms:
      configs.domain + configs.apiRoutes.home.getListFilms + configs.groupID,
    getListSystemTheaters:
      configs.domain + configs.apiRoutes.home.getListSystemTheaters,
    getListTheaters: configs.domain + configs.apiRoutes.home.getListTheaters,
    getListTheatersShowtimes:
      configs.domain +
      configs.apiRoutes.home.getListTheatersShowtimes +
      configs.groupID,
    postSignIn: configs.domain + configs.apiRoutes.home.postSignIn,
    postSignUp: configs.domain + configs.apiRoutes.home.postSignUp,
    postCustomerInfo: configs.domain + configs.apiRoutes.home.postCustomerInfo,
    getInfoFilm: configs.domain + configs.apiRoutes.home.getInfoFilm,
    getListTicketRoom:
      configs.domain + configs.apiRoutes.home.getListTicketRoom,
    postBookingTicket:
      configs.domain + configs.apiRoutes.home.postBookingTicket,
    putUpdateCustomerInfo:
      configs.domain + configs.apiRoutes.home.putUpdateCustomerInfo
  };

  constructor(private _http: HttpClient) {}

  public getListFilms(): Observable<any[]> {
    let result: any = this._http.get(this.API_URL.getListFilms);
    return result;
  }

  public getListSystemTheaters(): Observable<any[]> {
    let result: any = this._http.get(this.API_URL.getListSystemTheaters);
    return result;
  }

  public getListTheaters(systemTheaterID: string): Observable<any[]> {
    let result: any = this._http.get(
      this.API_URL.getListTheaters + systemTheaterID
    );
    return result;
  }

  public getListTheatersShowtimes(systemTheaterID: string): Observable<any> {
    let result: any = this._http.get(
      this.API_URL.getListTheatersShowtimes +
        configs.params.systemTheaterID +
        systemTheaterID
    );
    return result;
  }

  public postSignIn(user: any): Observable<any> {
    //Content-Type là do phía back-end định nghĩa, bắt buộc phải khai báo đúng
    let header = new HttpHeaders({ "Content-Type": "application/json" });
    //Khi sử dụng post thì phải gửi kèm theo cục body, ở đây body là {taiKhoan: userName, matKhau: password}
    //và kèm theo header để server có thể đọc hiểu được request
    let result = this._http.post(this.API_URL.postSignIn, user, {
      headers: header,
      responseType: "json"
    });
    console.log(result);
    return result;
  }
  public postSignUp(userInfo: any): Observable<any[]> {
    let header = new HttpHeaders({ "Content-Type": "application/json" });
    let result: any = this._http.post(this.API_URL.postSignUp, userInfo, {
      headers: header,
      responseType: "json"
    });

    return result;
  }

  public getInfoFilm(fimlID: string): Observable<any> {
    let result: any = this._http.get(this.API_URL.getInfoFilm + fimlID);
    return result;
  }
  public postCustomerInfo(userName: string, token): Observable<any[]> {
    let header = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    });
    let result: any = this._http.post(
      this.API_URL.postCustomerInfo,
      { taiKhoan: userName },
      {
        headers: header
      }
    );
    return result;
  }
  public getListTicketRoom(systemTheaterID: string): Observable<any> {
    let result: any = this._http.get(
      this.API_URL.getListTicketRoom + systemTheaterID
    );
    return result;
  }

  postBookingTicket(bookingInfo: any, token: string): Observable<any> {
    let header = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    });
    let result: any = this._http.post(
      this.API_URL.postBookingTicket,
      bookingInfo,
      { headers: header, responseType: "text" }
    );
    return result;
  }

  putUpdateCustomerInfo(userInfo: any, token: string): Observable<any> {
    let header = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    });
    let result: any = this._http.put(
      this.API_URL.putUpdateCustomerInfo,
      userInfo,
      {
        headers: header
      }
    );
    return result;
  }
}
