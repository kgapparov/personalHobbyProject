import { Component, OnInit } from '@angular/core';
import {AuthenticationDataService} from "../authentication-data.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  #_isLoggedIn!: boolean;

  get isLoggedIn():boolean {
    return this._authService.isAuthenticated;
  }
  set isLoggedIn(res:boolean ) {
    this._authService.isAuthenticated = res;
  }
  constructor(private _authService: AuthenticationDataService) { }

  ngOnInit(): void {

  }
}
