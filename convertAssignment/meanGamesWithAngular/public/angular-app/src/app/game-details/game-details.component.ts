import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GamesDataService } from '../games-data.service';
import { Game } from '../games-list/games-list.component';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {
  private _game: Game = new Game();

  public get game(): Game {
    return this._game;
  }

  constructor(private gamesService: GamesDataService, private route: ActivatedRoute) { }
 
  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const gameIdFromRoute: string = routeParams.get('gameId') || '';

    this.gamesService
      .getOneGame(gameIdFromRoute)
      .then(this.receivedGame.bind(this))
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.log('Error', error);
  }

  private receivedGame(game: Game) {
    this._game = game;
  }
}
