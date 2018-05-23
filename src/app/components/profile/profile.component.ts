import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  detailForm: FormGroup;

  constructor(private fb: FormBuilder, public auth: AuthService) { }

  ngOnInit() {

    this.detailForm = this.fb.group({
      'catchPhrase': ['', [ Validators.required ] ]
    });
    
  }
  get catchPhrase() { return this.detailForm.get('catchPhrase') }


  setCatchPhrase(user) {
    return this.auth.updateUser(user, { name:  this.catchPhrase.value })
  }
    

}
