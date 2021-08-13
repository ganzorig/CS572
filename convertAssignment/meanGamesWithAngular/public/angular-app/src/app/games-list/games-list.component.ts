import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { GamesDataService } from '../games-data.service';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css'],
})
export class GamesListComponent implements OnInit {
  private _games: Game[] = [];
  public get games(): Game[] {
    return this._games;
  }

  public gameForm!: FormGroup;
  public keyword: string = '';

  private _newGame: Game = new Game();
  public get newGame(): Game {
    return this._newGame;
  }
  public set newGame(newGame: Game) {
    this._newGame = newGame;
  }

  public isValid: boolean = true;

  constructor(
    private gamesService: GamesDataService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    const count: string = this.route.snapshot.queryParams.count;

    this.gamesService
      .getGames(count, '')
      .then((response) => {
        this._games = response;
      })
      .catch((error) => console.log(error));
  }

  createForm() {
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
  }

  deleteGame(gameId: string): void {
    if (window.confirm('Do you really want to delete?')) {
      this.gamesService
        .deleteOneGame(gameId)
        .then((response) => {
          console.log('res UI', response);
          window.location.reload();
        })
        .catch((error) => console.log(error));
    }
  }

  public gameSave() {
    this.isValid = this.gameForm.valid;

    if(this.gameForm.valid) {
      this.gamesService
      .addGame(this.gameForm.value)
      .then((response) => {
        console.log('res UI', response);
        window.location.reload();
      })
      .catch((error) => console.log(error));
    }
    
  }

  public onSearch() {
    this.gamesService
      .getGames('0', this.keyword)
      .then((response) => {
        console.log(response);

        this._games = response;
      })
      .catch((error) => console.log(error));
  }
}

interface Review {
  _id: string,
  name: string,
  review: string,
  date: Date,
}

export class Game {
  _id!: string;
  title!: string;
  price: number = 0;
  year: number = 1990;
  maxPlayers: number = 0;
  minPlayers: number = 0;
  minAge: number = 0;
  rate: number = 1;
  reviews: Review[] = [];
  designers: string[] = [];
  publisher: any = {};
}
