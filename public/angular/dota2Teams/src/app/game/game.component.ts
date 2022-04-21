import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameDataService } from '../game-data.service';
import { Team } from '../games/games.component';
import {AuthenticationDataService} from "../authentication-data.service";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  #_team!:Team;

  get isLogged() {
    return this._authDataService.isAuthenticated;
  }
  constructor(private service : GameDataService, private route: ActivatedRoute, private _authDataService:AuthenticationDataService) { }

  ngOnInit(): void {
    const id =  this.route.snapshot.params["teamId"];
    this.service.getTeam(id).subscribe({
      next: team => this.#_team = team,
      error: err => console.log(err),
      complete: ()=> console.log("done!")
    });
  }
  get team():Team{
    return this.#_team;
  }

}
