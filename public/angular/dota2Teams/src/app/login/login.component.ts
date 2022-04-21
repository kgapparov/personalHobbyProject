import { Component, OnInit } from '@angular/core';
import { NgForm} from "@angular/forms";
import {AuthenticationDataService} from "../authentication-data.service";
import {Router} from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";

export class ResponseToken  {
  success:boolean = false;
  token : string = "";
}
export class Credentials {
  username: string = "";
  password: string = ""
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  #_isLoggedIn!: boolean;
  #_name!: string;
  set name( name: string) {
    this.#_name = name;
  }

  get name(): string {
    return this._authService.name;
  }
  set isLoggedIn( result : boolean ) {
    this._authService.isAuthenticated = result;
    this.#_isLoggedIn = this._authService.isAuthenticated;
  }
  get isLoggedIn(): boolean {
    this.#_isLoggedIn = this._authService.isAuthenticated;
    return this._authService.isAuthenticated;
  }
  username!: string;
  constructor(private _authService: AuthenticationDataService, private _route: Router, private _jwtService: JwtHelperService) {
    this.isLoggedIn = this._authService.isAuthenticated;
  }

  ngOnInit(): void {
    if (localStorage.getItem("token")) {
      this.isLoggedIn = true;
    }
  }


  login(form: NgForm){
    let credentials: Credentials;
    credentials = {
      username: form.value["username"],
      password: form.value["password"]
    }
    this._authService.login(credentials).subscribe({
      next: responseToken=> this._saveTokenAndChangeStatus(responseToken, credentials.username),
      error: err => console.log(err),
      complete: ()=> console.log("Done")
    })
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    this._authService.isAuthenticated = false;
    this.isLoggedIn = false;
    this._route.navigate([""]);
  }

   _saveTokenAndChangeStatus (responseToken: ResponseToken, username:string) {
    localStorage.setItem("token", responseToken.token);
    this.name = this._jwtService.decodeToken(responseToken.token).username as string;
    console.log(this.name);
    this._authService.isAuthenticated = true;
    this.isLoggedIn = true;
    this._route.navigate([""]);
  }
}

