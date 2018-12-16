import { Component, OnInit } from '@angular/core';
import { FormControl, Validators} from '@angular/forms';

export interface Animal {
  name: string;
  sound: string;
}

@Component({
  selector: 'app-gold-card-register',
  templateUrl: './gold-card-register.component.html',
  styleUrls: ['./gold-card-register.component.css']
})
export class GoldCardRegisterComponent implements OnInit {

  startDate = new Date(1990, 0, 1);

  animalControl = new FormControl('', [Validators.required]);
  selectFormControl = new FormControl('', Validators.required);
  animals: Animal[] = [
    {name: 'Dog', sound: 'Woof!'},
    {name: 'Cat', sound: 'Meow!'},
    {name: 'Cow', sound: 'Moo!'},
    {name: 'Fox', sound: 'Wa-pa-pa-pa-pa-pa-pow!'},
  ];

  constructor() { }

  ngOnInit() {
  }

}
