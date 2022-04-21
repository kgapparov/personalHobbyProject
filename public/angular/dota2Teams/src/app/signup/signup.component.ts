import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {UserDataService} from "../user-data.service";


export class Creadentials {
  #_username!:string;
  #_password!:string;

  constructor(username:string, password:string) {
    this.#_username = username;
    this.#_password = password;
  }

  get username():string {
    return this.#_username;
  }
  get password():string{
    return this.#_password
  }

  set username(username){
    this.#_username = username;
  }
  set password(password) {
    this.#_password = password;
  }
}

export class User {
  #_name!:string;
  #_username!:string;
  #_password!:string;

  constructor(name:string, username:string, password:string) {
    this.#_name = name;
    this.#_username = username;
    this.#_password = password;
  }

  get name():string {
    return this.#_name;
  }
  get username():string {
    return this.#_username;
  }
  get password():string{
    return this.#_password
  }
  set name(name) {
    this.#_name = name;
  }
  set username(username){
    this.#_username = username;
  }
  set password(password) {
    this.#_password = password;
  }
}
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  isError:boolean = false;
  isSuccess:boolean = false;
  errorMessage: string = "";
  successMessage:string = "User created successfully";
  constructor(private _service: UserDataService) { }

  ngOnInit(): void {
  }

  signUp(form: NgForm){
    let obj = form.value;
    let newUser:User = Object.assign({
      name: obj["user"].fullName,
      username: obj["user"].username,
      password: obj["user"].password
    });
    console.log(newUser);
    if (newUser["password"] != obj["user"].passwordRepeat) {
      this.isError = true;
      this.isSuccess = false;
      this.errorMessage = "Password have to match!";
    } else if (!newUser.name || !newUser.password || !newUser.username){
      this.isError = true;
      this.errorMessage = "Fill all required fields!";
    } else {
      this._service.signUp(newUser).subscribe({
          next: result => {
            this.isSuccess = true;
            this.isError = false;
            this.successMessage = "User created successfully!"
          },
          error: err => {
            this.isError = true;
            this.isSuccess = false;
            this.errorMessage = err;
          },
          complete: ()=> {
            console.log("Done!");
          }
        });
    }
  }

  login(){

  }

}
