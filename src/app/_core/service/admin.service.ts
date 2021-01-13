import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { configs } from "../config";

@Injectable({
  providedIn: "root"
})
export class AdminService {
  API_URL = {
    postAddUser: configs.domain + configs.apiRoutes.admin.user.postAddUser,
    getListUser:
      configs.domain +
      configs.apiRoutes.admin.user.getListUser +
      configs.groupID,
    getListUserPaginate:
      configs.domain +
      configs.apiRoutes.admin.user.getListUserPaginate +
      configs.groupID +
      configs.params.pageSetUp,
    getSearchUser: configs.domain + configs.apiRoutes.admin.user.getSearchUser,
    deleteUser: configs.domain + configs.apiRoutes.admin.user.deleteUser,
    putUpdateUser: configs.domain + configs.apiRoutes.admin.user.putUpdateUser,
    getListFilmPaginate:
      configs.domain +
      configs.apiRoutes.admin.film.getListFilmPaginate +
      configs.groupID +
      configs.params.pageSetUp,
    postAddFilm: configs.domain + configs.apiRoutes.admin.film.postAddFilm,
    postUploadImgFilm:
      configs.domain + configs.apiRoutes.admin.film.postUploadImgFilm,
    deleteFilm: configs.domain + configs.apiRoutes.admin.film.deleteFilm,
    getSearchFilm: configs.domain + configs.apiRoutes.admin.film.getSearchFilm,
    postUpdateFilm:
      configs.domain + configs.apiRoutes.admin.film.postUpdateFilm,
    postAddShowTime:
      configs.domain + configs.apiRoutes.admin.film.postAddShowTime,
    getListShowtimes: configs.domain + configs.apiRoutes.home.getListShowtimes
  };

  responseType = "json";
  header = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(private _http: HttpClient) {}

  // User API
  postAddUser(userInfo: any, token: string): Observable<any> {
    let result = this._http.post(this.API_URL.postAddUser, userInfo, {
      headers: this.createHeaderWithAuth(token),
      responseType: "json"
    });
    console.log(token);
    console.log(result);
    return result;
  }

  getListUser(): Observable<any[]> {
    let result: any = this._http.get(this.API_URL.getListUser);
    return result;
  }

  getListUserPaginate(pageNumber: any): Observable<any> {
    let result: any = this._http.get(
      this.API_URL.getListUserPaginate + pageNumber
    );
    return result;
  }

  getSearchUser(userName: any): Observable<any> {
    let result: any = this._http.get(
      this.API_URL.getSearchUser +
        userName +
        configs.params.groupID +
        configs.groupID
    );
    return result;
  }

  deleteUser(userName: any, token: string): Observable<any> {
    let result: any = this._http.delete(this.API_URL.deleteUser + userName, {
      headers: this.createHeaderWithAuth(token),
      responseType: "text"
    });
    return result;
  }

  putUpdateUser(userInfo: any, token: string): Observable<any> {
    let result: any = this._http.put(this.API_URL.putUpdateUser, userInfo, {
      headers: this.createHeaderWithAuth(token),
      responseType: "text"
    });
    return result;
  }

  // End User API

  //  Film API

  getListFilmPaginate(pageNumber: any): Observable<any> {
    let result: any = this._http.get(
      this.API_URL.getListFilmPaginate + pageNumber
    );
    return result;
  }

  postAddFilm(film: any, token: string): Observable<any> {
    let result = this._http.post(this.API_URL.postAddFilm, film, {
      headers: this.createHeaderWithAuth(token),
      responseType: "json"
    });
    return result;
  }

  postUploadImgFilm(data: any, token: string): Observable<any> {
    let result = this._http.post(this.API_URL.postUploadImgFilm, data, {
      headers: this.createHeaderWithAuthNotContentType(token),
      responseType: "text"
    });
    return result;
  }

  deleteFilm(filmID: any, token: string): Observable<any> {
    let result: any = this._http.delete(this.API_URL.deleteFilm + filmID, {
      headers: this.createHeaderWithAuth(token),
      responseType: "text"
    });
    return result;
  }

  getSearchFilm(filmID: any): Observable<any> {
    let result: any = this._http.get(this.API_URL.getSearchFilm + filmID);
    return result;
  }

  postUpdateFilm(filmInfo: any, token: string): Observable<any> {
    let result: any = this._http.post(this.API_URL.postUpdateFilm, filmInfo, {
      headers: this.createHeaderWithAuth(token),
      responseType: "text"
    });
    return result;
  }

  postAddShowTime(showTimeInfo: any, token: string): Observable<any> {
    let result: any = this._http.post(
      this.API_URL.postAddShowTime,
      showTimeInfo,
      { headers: this.createHeaderWithAuth(token), responseType: "text" }
    );
    return result;
  }

  // End Film API

  // Showtime API
  getListShowtimes(filmID: string): Observable<any> {
    let result: any = this._http.get(this.API_URL.getListShowtimes + filmID);
    return result;
  }
  // End Showtime API

  createHeaderWithAuth(token: string): HttpHeaders {
    return new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    });
  }

  createHeaderWithAuthNotContentType(token: string): HttpHeaders {
    return new HttpHeaders({
      Authorization: "Bearer " + token
    });
  }
}
