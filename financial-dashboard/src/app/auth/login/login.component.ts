import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { FormBuilder, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { login } from '../../config/auth.actions';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  signInForm: FormGroup;
  submitted: boolean = false;

  constructor(private fb: FormBuilder,
    private store: Store,
    private router: Router
  ) {
    this.signInForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.signInForm.valid) {
      const username = this.signInForm.value.userName;
      const password = this.signInForm.value.password;
      this.store.dispatch(login({ username, password }));
      this.router.navigate(['/home']);
    } else {
      console.log('Form is invalid');
    }
  }

  get f() {
    return this.signInForm.controls;
  }
}