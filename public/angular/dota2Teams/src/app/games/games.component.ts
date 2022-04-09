import { Component, OnInit } from '@angular/core';
import { GameDataService } from '../game-data.service';



export class Players {
  #_nickName!:string; 
  #_name!:string; 
  #_position!: number; 
  #_joinDate!: Date;
  get nickName():string{
    return this.#_nickName;
  }
  get name():string {
    return this.#_name;
  }
  get position():number{
    return this.#_position;
  }
  set position(position:number) {
    this.#_position = position;
  }
  get joinDate():Date{
    return this.#_joinDate;
  }
  set nickName(nickName: string) {
    this.#_nickName = nickName; 
  } 
  set name(name : string){
    this.#_name = name; 
  }
  set joinDate(date : Date) {
    this.#_joinDate = date; 
  }
}

export class Team {
  #id!: string;
  #_name!: string;
  #_players!: Players[];
  constructor() {
    this.#_players = new Array<Players>();
  }
  #_playersCount!:number;
  #_owner!:string;
  get name():string {
    return this.#_name;
  }
  set name(name:string) {
    this.#_name = name; 
  }
  get _id():string {
    return this.#id;
  }
  set _id(id : string) {
    this.#id = id; 
  }
  get players():Players[] {
    return this.#_players; 
  }
  set players(players: Players[]) {
    this.#_players = players;
  }
  get playersCount():number {
    return this.#_playersCount; 
  }
  set playersCount(count : number){ 
    this.#_playersCount = count; 
  }
  get owner():string {
    return this.#_owner; 
  }
  set owner(owner: string) {
    this.#_owner = owner; 
  }
}

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  
  #_teams!: Team[]; 
  constructor(private service: GameDataService) { }

  ngOnInit(): void {
    this.service.getTeams().subscribe({
      next: teams => {
        this.#_teams = teams; 
        console.log(teams);
      },
      error: err => console.log(err),
      complete: ()=> console.log("Done!")
    })
  }
  get teams():Team[] {
    return this.#_teams;
  }
}
