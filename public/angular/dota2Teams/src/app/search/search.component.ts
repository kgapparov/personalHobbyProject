import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GameDataService } from '../game-data.service';
import { Team } from '../games/games.component';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  teams: Team[];
  searchContent:string= "";
  constructor(private service : GameDataService) { 
    this.teams = [];
  }

  ngOnInit(): void {
  }

  serch(form: NgForm) {
    this.service.searchTeams(this.searchContent).subscribe({
      next: res => {
        this.teams = res; 
      },
      error: err => console.log(err),
      complete: () => console.log("Done")
    });
  }
}
