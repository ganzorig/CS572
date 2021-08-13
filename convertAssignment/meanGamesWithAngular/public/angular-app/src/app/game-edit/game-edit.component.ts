import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

import { GamesDataService } from '../games-data.service';
import { Game } from '../games-list/games-list.component';

@Component({
  selector: 'app-game-edit',
  templateUrl: './game-edit.component.html',
  styleUrls: ['./game-edit.component.css'],
})
export class GameEditComponent implements OnInit {
  private _game: Game = new Game();

  public get game(): Game {
    return this._game;
  }

  public gameForm!: FormGroup;
  public isValid: boolean = true;

  constructor(
    private gamesService: GamesDataService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const gameIdFromRoute: string = routeParams.get('gameId') || '';

    this.gameForm = this.formBuilder.group({
      title: new FormControl(''),
      price: new FormControl(0),
      year: new FormControl(2021),
      rate: new FormControl(5),
      maxPlayers: new FormControl(8),
      minPlayers: new FormControl(1),
      minAge: new FormControl(3),
      designer: new FormControl(''),
    });

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
    console.log(game.designers);
    this.gameForm.patchValue(game);

    this.gameForm.patchValue({ designer: game.designers[0] });
  }

  public gameSave() {
    this.isValid = this.gameForm.valid;
    const gameId = this.route.snapshot.params.gameId;

    if(this.gameForm.valid) {
      this.gamesService
      .updateOneGame(gameId, this.gameForm.value)
      .then((response) => {
        console.log('Successfully saved');
        window.history.back();
        alert('Successfully saved');

      })
      .catch((error) => console.log(error));
    }
  }
}
