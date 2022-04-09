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
  constructor(private service: GameDataService) {
    this.team = new Team();
    this.player = new Players();
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
    this.team.players.push(this.player);
  }

  removePlayerFromTeam(){
    this.team.players.pop();
  }

  addTeam(){
    console.log(this.team);
    this.service.addTeam(this.team).subscribe({
      next: res => console.log("result of adding team " + res),
      error: err => console.log(err),
      complete: ()=> console.log("Done")
    });
  }
}
