import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

import { Sneaker } from '../sneaker-list/sneaker-list.component';
import { SneakersDataService } from '../sneakers-data.service';


@Component({
  selector: 'app-sneaker-edit',
  templateUrl: './sneaker-edit.component.html',
  styleUrls: ['./sneaker-edit.component.css']
})
export class SneakerEditComponent implements OnInit {
  private _sneaker: Sneaker = new Sneaker();

  public get sneaker(): Sneaker {
    return this._sneaker;
  }

  public sneakerForm!: FormGroup;
  public isValid: boolean = true;

  constructor(
    private sneakerService: SneakersDataService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const sneakerId: string = routeParams.get('sneakerId') || '';

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

    this.sneakerService
      .getOneSneaker(sneakerId)
      .then(this.receivedSneaker.bind(this))
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.log('Error', error);
  }

  private receivedSneaker(sneaker: Sneaker) {
    this._sneaker = sneaker;
    this.sneakerForm.patchValue(sneaker);

    //this.sneakerForm.patchValue({ designer: game.designers[0] });
  }

  public sneakerSave() {
    this.isValid = this.sneakerForm.valid;
    const sneakerId = this.route.snapshot.params.sneakerId;

    if(this.sneakerForm.valid) {
      this.sneakerService
      .updateOneSneaker(sneakerId, this.sneakerForm.value)
      .then((response) => {
        console.log('Successfully saved');
        window.history.back();
        alert('Successfully saved');

      })
      .catch((error) => console.log(error));
    }
  }

}
