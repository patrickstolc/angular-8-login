import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  form: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthenticationService, private router: Router) {
    this.form = this.fb.group({
      username: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]))
    });
  }

  ngOnInit() {}

  signUpUser(){
    this.authService.signUp(
      this.form.get('username').value,
      this.form.get('password').value
    ).subscribe(
      (result:any) => {
        if(result['status'] == 'success'){
          this.form.reset();
          this.router.navigate(['sign-in']);
        }
      }
    )
  }

}
