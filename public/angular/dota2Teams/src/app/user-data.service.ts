import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {User} from "./signup/signup.component";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  baseURL:string = environment.USER_AIP_BASE_URL;

  constructor(private http: HttpClient) {
  }

  signUp(user:User):Observable<User> {
    console.log(user);
    return this.http.post<User>(this.baseURL, user);
  }

  login(credentials: Credential):Observable<any> {
    return this.http.post<any>(this.baseURL+"/check", credentials);
  }
}
