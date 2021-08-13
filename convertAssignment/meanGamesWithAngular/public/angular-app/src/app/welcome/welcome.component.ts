import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  private _title:string = 'Mean games';
  public get title() {
    return this._title;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
