import { Component, OnInit } from '@angular/core';
import {AuthenticationDataService} from "../authentication-data.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private _authDataService: AuthenticationDataService) { }

  get name() {
    return this._authDataService.name;
  }
  ngOnInit(): void {
  }

}
