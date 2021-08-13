import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { SneakersDataService } from '../sneakers-data.service';

@Component({
  selector: 'app-sneaker-list',
  templateUrl: './sneaker-list.component.html',
  styleUrls: ['./sneaker-list.component.css']
})
export class SneakerListComponent implements OnInit {
  private _sneakers: Sneaker[] = [];
  public get sneakers(): Sneaker[] {
    return this._sneakers;
  }

  public sneakerForm!: FormGroup;
  public keyword: string = '';

  private _newSneaker: Sneaker = new Sneaker();
  public get newSneaker(): Sneaker {
    return this._newSneaker;
  }
  public set newSneaker(newSneaker: Sneaker) {
    this._newSneaker = newSneaker;
  }

  public isValid: boolean = true;

  constructor(
    private sneakerService: SneakersDataService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    const count: string = this.route.snapshot.queryParams.count;

    this.sneakerService
      .getAllSneakers(count, '')
      .then((response) => {

        this._sneakers = response;
      })
      .catch((error) => console.log(error));
  }

  createForm() {
    this.sneakerForm = this.formBuilder.group({
      name: new FormControl(''),
      brand: new FormControl(''),
      description: new FormControl(),
      color: new FormControl(),
      releaseYear: new FormControl(),
      usSize: new FormControl(),
      gender: new FormControl(),
      price: new FormControl(),
    });
  }

  deleteSneaker(sneakerId: string): void {
    if (window.confirm('Do you really want to delete?')) {
      this.sneakerService
        .deleteOneSneaker(sneakerId)
        .then((response) => {
          console.log('res UI', response);
          window.location.reload();
        })
        .catch((error) => console.log(error));
    }
  }

  public sneakerSave() {
    this.isValid = this.sneakerForm.valid;
    
    if(this.sneakerForm.valid) {
      this.sneakerService
        .addOneSneaker(this.sneakerForm.value)
        .then((response) => {
          console.log('res UI', response);
          window.location.reload();
        })
        .catch((error) => console.log(error));
    }
    
  }

  public onSearch() {
    this.sneakerService
      .getAllSneakers('0', this.keyword)
      .then((response) => {
        this._sneakers = response;
      })
      .catch((error) => console.log(error));
  }
}

export interface Review {
  _id: string,
  title: string,
  review: string,
  date: Date,
  rate: number
}

export class Sneaker {
  _id!: string;
  name!: string;
  brand: string = '';
  description: string = '';
  color: string = '';
  releaseYear: number = 2000;
  usSize: number = 7;
  gender: string = 'Male';
  price: number = 0;
  images: string[] = [];
  reviews: Review[] =[];
}
