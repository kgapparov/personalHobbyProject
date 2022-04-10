import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameDataService } from '../game-data.service';

@Component({
  selector: 'app-delete-game',
  templateUrl: './delete-game.component.html',
  styleUrls: ['./delete-game.component.css']
})
export class DeleteGameComponent implements OnInit {

  @Input()
  gameId!: string; 
  constructor(private service: GameDataService, private _router : Router) { }

  ngOnInit(): void {
  }
  delete(){
    this.service.deleteTeam(this.gameId).subscribe ({
      next: res => console.log(res),
      error: err => console.log(err),
      complete: () => {
         this._router.navigate([""])
      }
    })
  }
} 
