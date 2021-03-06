import { Component, OnInit } from '@angular/core';
import {DatePipe} from '@angular/common';
import { GoldcardService } from '../goldcard.service';
import {ErrorStateMatcher} from '@angular/material/core';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup} from '@angular/forms';

export class MyErrorStateMatcher implements ErrorStateMatcher {
isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-gold-card-register',
  templateUrl: './gold-card-register.component.html',
  styleUrls: ['./gold-card-register.component.css']
})
export class GoldCardRegisterComponent implements OnInit {


  provinces : Array<any>;
  rightstypes : Array<any>;
  hostpitals : Array<any>;
  rightregistrations : Array<any>;
  input: any = {
      username: '',
      password: '',
      firstname:  '',
      surname:  '',
      tel:  '',
      personalcard:  '',
      birthday:  '',
      dateregis:  '',
    };
    select: any = {
          rightstypename: '',
          hostpitalname: '',
          provincename:  '',
    };

  startDate = new Date(1990, 0, 1);
  CurrentDate = new Date();
  pipe = new DatePipe('en-US');
  matcher = new MyErrorStateMatcher();
  lock: FormGroup;
  myControl = new FormControl();

  constructor(fb: FormBuilder,private goldcardService: GoldcardService, private httpClient: HttpClient){
       this.lock = fb.group({
          hideRequiredMarker: false,
          floatLabel: 'never',
       });
  }
  regis(){
  // http://localhost:8080/Rightregistration/{username}/{password}/{firstname}/{surname}/{tel}/{personal}/{dateregis}/{birthdate}/{provincename}/{rightstypename}/{hostpitalname}
              this.httpClient.post('http://localhost:8080/Rightregistration/'+ this.input.username+ '/' + this.input.password+'/'+this.input.firstname+'/'+this.input.surname+'/'+this.input.tel+'/'+this.input.personalcard+'/'+this.pipe.transform(this.CurrentDate,'dd:MM:yyyy')+'/'+this.pipe.transform(this.input.birthday,'dd:MM:yyyy')+'/'+this.select.provincename+'/'+this.select.rightstypename+'/'+this.select.hostpitalname,this.input)
                .subscribe(
                    data => {
                        console.log('PUT Request is successful', data);
                    },
                    error => {
                        console.log('Error', error);
                        alert('ไม่สำเร็จ\nกรุณากรอกข้อมูลอีกครั้ง');
                    }
                );

  }

  ngOnInit() {
      this.goldcardService.getRightsType().subscribe(data =>{
            this.rightstypes = data;
            console.log(this.rightstypes);
      });
      this.goldcardService.getProvince().subscribe(data =>{
            this.provinces = data;
            console.log(this.provinces);
      });
      this.goldcardService.getHostpital().subscribe(data =>{
            this.hostpitals = data;
            console.log(this.hostpitals);
      });
      this.goldcardService.getRightRegistration().subscribe(data =>{
                  this.rightregistrations = data;
                  console.log(this.rightregistrations);
            });
  }

onSubmit(form: NgForm) {
    console.log(form);
}
  passwordFormControl = new FormControl('', [
            Validators.required,
  ]);

}
