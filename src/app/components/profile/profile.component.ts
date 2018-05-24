import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  detailForm: FormGroup;

  constructor(private fb: FormBuilder, public auth: AuthService, public snackBar: MatSnackBar) { }
  
  openSnackBar() {
    this.snackBar.open("Details Submited", "OK", {
      duration: 2000,
    });
  }

  ngOnInit() {

    this.detailForm = this.fb.group({
      'firstName': ['', [ Validators.required ] ],
      'lastName': ['', [ Validators.required ] ],
      'role': ['', [ Validators.required ] ],
      'email': ['', [ Validators.email] ]
    });
    
  }
  get firstName() { return this.detailForm.get('firstName') }
  get lastName() { return this.detailForm.get('lastName') }
  get role() { return this.detailForm.get('role') }
  get email() { return this.detailForm.get('email') }
  
  detailFormSubmit(user) {
  
    let submitStatus = this.auth.updateUser(user, { firstName:  this.firstName.value,
      lastName:  this.lastName.value,
      role: this.role.value,
      email: this.email.value

     })



     // TODO: add logic to display snakbar based on submitStatus 

     this.snackBar.open("Details Submited", "OK", {
      duration: 2000,
    })

    
     
  }

 
    

}
