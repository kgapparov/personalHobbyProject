import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Credentials, ResponseToken} from "./login/login.component";
import {environment} from "../environments/environment";
import {JwtHelperService} from "@auth0/angular-jwt";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationDataService {
  #_isAuthenticated : boolean = false;
  #_name: string = "";

  get name():string {
    if (localStorage.getItem("token")) {
      this.#_isAuthenticated = true;
      // @ts-ignore
      return this._jwtServiceHelper.decodeToken(localStorage.getItem("token")).username as string;
    } else {
      return "unknown";
    }
  }

  set name (name) {
    this.#_name = name;
  }

  get isAuthenticated(): boolean {
    return this.#_isAuthenticated;
  }
  set isAuthenticated(isAuthenticated : boolean){
    this.#_isAuthenticated = isAuthenticated;
  }

  constructor(private _http: HttpClient,  private _jwtServiceHelper: JwtHelperService) { }

  login(credentials: Credentials):Observable<ResponseToken> {
    return this._http.post<ResponseToken>(environment.USER_LOGIN_URL, credentials)
  }

}
