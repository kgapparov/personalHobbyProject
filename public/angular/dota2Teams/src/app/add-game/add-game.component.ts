import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GameDataService } from '../game-data.service';

import { Players, Team } from '../games/games.component';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent implements OnInit {
  team!: Team;
  player!: Players;
  players!: Players[];
  constructor(private service: GameDataService) {
    this.team = new Team();
    this.player = new Players();
    this.players = [];
   }

  ngOnInit(): void {
   setTimeout(()=>{
    this.team.name = "No Name";
    this.team.owner = "No Name";
    this.team.players = [];
    this.team.playersCount = 0;
    this.player.name = "No Name",
    this.player.nickName = "NickName",
    this.player.position = 0
   }, 0);
  }

  createTeam(form: NgForm):void{
    console.log(form.value);

    // this.team.players.push(this.player);
    // this.players = Object.assign([], this.team.players);
  }

  removePlayerFromlist(){
    this.team.players.pop();
  }
  addPlayer (form: NgForm) {
    let newPlayer: Players = new Players();
    newPlayer = Object.assign({
      name: this.player.name,
      nickName: this.player.nickName,
      position: this.player.position,
      joinDate: this.player.joinDate
    }, this.player)
    this.players.push(newPlayer);
    this.ngOnInit();
  }
  addTeam(){
    let newTeam: Team = new Team();

    newTeam = Object.assign({
      name: this.team.name,
      playersCount: this.team.playersCount,
      owner: this.team.owner,
      players: []
    }, this.team);
    newTeam.players = this.players;
    console.log(newTeam);

    this.service.addTeam(newTeam).subscribe({
      next: res => console.log("result of adding team " + res),
      error: err => console.log(err),
      complete: ()=> console.log("Done")
    });
  }
}
