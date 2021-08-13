import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Sneaker } from './sneaker-list/sneaker-list.component';

@Injectable({
  providedIn: 'root'
})
export class SneakersDataService {
  private apiBaseUrl: string = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  public getAllSneakers(count: string, keyword: string): Promise<Sneaker[]> {
    const paramString =
      keyword && count
        ? `?search=${keyword}&count=${count}`
        : keyword
        ? `?search=${keyword}`
        : count
        ? `?count=${count}`
        : '';

    let url: string = this.apiBaseUrl + '/sneakers' + paramString;

    return this.http
      .get(url)
      .toPromise()
      .then((response) => response as Sneaker[])
      .catch(this.handleError);
  }

  public getOneSneaker(sneakerId: string): Promise<Sneaker> {
    const url: string = `${this.apiBaseUrl}/sneakers/${sneakerId}`;

    return this.http
      .get(url)
      .toPromise()
      .then((response) => response as Sneaker)
      .catch(this.handleError);
  }

  public deleteOneSneaker(sneakerId: string) {
    const url: string = `${this.apiBaseUrl}/sneakers/${sneakerId}`;

    return this.http
      .delete(url)
      .toPromise()
      .then((response) => {
        console.log('service', response);

        return response;
      })
      .catch(this.handleError);
  }

  public addOneSneaker(sneaker: any) {
    const url: string = `${this.apiBaseUrl}/sneakers`;

    return this.http
      .post(url, sneaker)
      .toPromise()
      .then((response) => {
        return response;
      })
      .catch(this.handleError);
  }

  public addReview(sneakerId: string ,review: any) {
    const url: string = `${this.apiBaseUrl}/sneakers/${sneakerId}/reviews`;

    return this.http
      .post(url, review)
      .toPromise()
      .then((response) => {
        return response;
      })
      .catch(this.handleError);
  }

  public updateOneSneaker(sneakerId: string, sneaker: any) {
    const url: string = `${this.apiBaseUrl}/sneakers/${sneakerId}`;

    return this.http
      .put(url, sneaker)
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

