import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Game } from './games-list/games-list.component';

@Injectable({
  providedIn: 'root',
})
export class GamesDataService {
  private apiBaseUrl: string = 'http://localhost:3100/api';

  constructor(private http: HttpClient) {}

  public getGames(count: string, keyword: string): Promise<Game[]> {
    const paramString =
      keyword && count
        ? `?search=${keyword}&count=${count}`
        : keyword
        ? `?search=${keyword}`
        : count
        ? `?count=${count}`
        : '';

    let url: string = this.apiBaseUrl + '/games' + paramString;

    // if(count) {
    //   url = this.apiBaseUrl + '/games?count=' + count;
    // }

    return this.http
      .get(url)
      .toPromise()
      .then((response) => response as Game[])
      .catch(this.handleError);
  }

  public getOneGame(gameId: string): Promise<Game> {
    const url: string = `${this.apiBaseUrl}/games/${gameId}`;

    return this.http
      .get(url)
      .toPromise()
      .then((response) => response as Game)
      .catch(this.handleError);
  }

  public deleteOneGame(gameId: string) {
    const url: string = `${this.apiBaseUrl}/games/${gameId}`;

    return this.http
      .delete(url)
      .toPromise()
      .then((response) => {
        console.log('service', response);

        return response;
      })
      .catch(this.handleError);
  }

  public addGame(game: any) {
    const url: string = `${this.apiBaseUrl}/games`;

    return this.http
      .post(url, game)
      .toPromise()
      .then((response) => {
        return response;
      })
      .catch(this.handleError);
  }

  public updateOneGame(gameId: string, game: any) {
    const url: string = `${this.apiBaseUrl}/games/${gameId}`;

    return this.http
      .put(url, game)
      .toPromise()
      .then((response) => {

        return response;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.log(error);
    return Promise.reject(error.message || error);
  }
}
