import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Sneaker } from '../sneaker-list/sneaker-list.component';
import { SneakersDataService } from '../sneakers-data.service';

@Component({
  selector: 'app-sneaker-detail',
  templateUrl: './sneaker-detail.component.html',
  styleUrls: ['./sneaker-detail.component.css'],
})
export class SneakerDetailComponent implements OnInit {
  private _sneaker: Sneaker = new Sneaker();

  public get sneaker(): Sneaker {
    return this._sneaker;
  }

  public reviewForm!: FormGroup;

  constructor(
    private sneakerService: SneakersDataService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.createReviewForm();
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const sneakerIdFromRoute: string = routeParams.get('sneakerId') || '';

    this.sneakerService
      .getOneSneaker(sneakerIdFromRoute)
      .then(this.receivedSneaker.bind(this))
      .catch(this.handleError);
  }

  createReviewForm() {
    this.reviewForm = this.formBuilder.group({
      title: new FormControl(''),
      review: new FormControl(''),
      rate: new FormControl(1)
    });
  }

  public reviewSave() {
    console.log(this.reviewForm);
    const sneakerId = this.route.snapshot.params.sneakerId;
    if(this.reviewForm.valid) {
      console.log(this.reviewForm.value);
      
      this.sneakerService
        .addReview(sneakerId, this.reviewForm.value)
        .then((response) => {
          console.log('res UI', response);
          window.location.reload();
        })
        .catch((error) => console.log(error));
    }
    
  }

  private handleError(error: any) {
    console.log('Error', error);
  }

  private receivedSneaker(sneaker: Sneaker) {
    this._sneaker = sneaker;
  }

  public _convertStarsArray = (rate: number) => {
    return new Array(rate);
  };
}
