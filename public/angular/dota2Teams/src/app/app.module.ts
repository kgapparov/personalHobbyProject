import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import {JWT_OPTIONS, JwtHelperService} from "@auth0/angular-jwt";

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { GamesComponent } from './games/games.component';
import { GameComponent } from './game/game.component';
import { AddGameComponent } from './add-game/add-game.component';
import { DeleteGameComponent } from './delete-game/delete-game.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchComponent } from './search/search.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    FooterComponent,
    GamesComponent,
    GameComponent,
    AddGameComponent,
    DeleteGameComponent,
    SearchComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: "",
        component: HomeComponent
      },
      {
        path: "teams",
        component : GamesComponent
      },
      {
        path: "teams/search",
        component: SearchComponent
      },
      {
        path: "teams/add",
        component: AddGameComponent
      },
      {
        path: "users/signup",
        component: SignupComponent
      },
      {
        path: "users/profile",
        component: ProfileComponent
      },
      {
        path: "teams/:teamId",
        component: GameComponent
      }
    ]),
    NgbModule
  ],
  providers: [JwtHelperService, {provide: JWT_OPTIONS, useValue: JWT_OPTIONS}],
  bootstrap: [AppComponent]
})
export class AppModule { }
