import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Team } from './games/games.component';
@Injectable({
  providedIn: 'root'
})
export class GameDataService {
  #_baseURL!:string; 
  constructor(private http: HttpClient, private route: ActivatedRoute) { 
    this.#_baseURL = environment.TEAM_API_BASE_URL;
  }

  getTeams():Observable<Team[]> {
    return this.http.get<Team[]>(this.#_baseURL+"teams");
  }
  getTeam(id:string):Observable<Team> {
    return this.http.get<Team>(this.#_baseURL + "teams/"+ id);
  }
  addTeam(team: Team):Observable<any> {
    return this.http.post<any>(this.#_baseURL + "teams", team);
  }
}
