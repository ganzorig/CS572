import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { GamesListComponent } from './games-list/games-list.component';
import { GameDetailsComponent } from './game-details/game-details.component';
import { GameRatingComponent } from './game-rating/game-rating.component';
import { GameEditComponent } from './game-edit/game-edit.component';

const routes: Routes = [
  {
    path: "",
    component: WelcomeComponent
  },
  {
    path: "games",
    component: GamesListComponent
  },
  {
    path: 'game/:gameId', 
    component: GameDetailsComponent 
  },
  {
    path: 'game/edit/:gameId', 
    component: GameEditComponent 
  },
  {
    path: "**",
    component: ErrorPageComponent
  },
  
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    WelcomeComponent,
    ErrorPageComponent,
    GamesListComponent,
    GameDetailsComponent,
    GameRatingComponent,
    GameEditComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
