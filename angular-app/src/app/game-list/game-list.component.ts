import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  games: string[] = ['Catan', 'Sequence', 'Monopoly'];
  title: string = 'Games';
  constructor() { }

  ngOnInit(): void {
  }

}
