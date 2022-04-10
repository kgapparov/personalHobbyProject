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
  #_teams:Team[] = [];
  get teams(): Team[] {
    return this.#_teams;
  } 
  set teams(teams: Team[]) {
    this.#_teams = teams;
  }
  
  #_baseURL!:string; 
  constructor(private http: HttpClient, private route: ActivatedRoute) { 
    this.#_baseURL = environment.TEAM_API_BASE_URL;
  }

  getTeams():Observable<Team[]> {
    return this.http.get<Team[]>(this.#_baseURL+"teams");
  }
  searchTeams(name: string):Observable<Team[]> {
    return this.http.get<Team[]>(this.#_baseURL+"teams/search/?name=" + name);
  }
  getTeam(id:string):Observable<Team> {
    return this.http.get<Team>(this.#_baseURL + "teams/"+ id);
  }
  addTeam(team: Team):Observable<Team> {
    console.log("team to send "+team);
    return this.http.post<Team>(this.#_baseURL + "teams", team);
  }
}
