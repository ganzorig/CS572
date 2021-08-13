import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-game-rating',
  templateUrl: './game-rating.component.html',
  styleUrls: ['./game-rating.component.css']
})
export class GameRatingComponent implements OnInit {

  private _rate!: number;

  @Input() set rate(rate: number) {
    this._rate = rate;
    this._convertStarsArray();
  }

  private _rating: number[] = [];

  public get rating(): number[] {
    return this._rating;
  }

  _convertStarsArray = () => {
    return this._rating = new Array(this._rate);
  }

  constructor() { }

  ngOnInit(): void {
  }
}
