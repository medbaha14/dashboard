import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from '../../services/AuthService';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'], 
})
export class RegisterComponent {
  signUpForm!: FormGroup;
  submitted = false;

  formFields = [
    {
      name: 'username',
      label: 'User Name',
      type: 'text',
      placeholder: 'Enter your user name',
      validators: [Validators.required, Validators.minLength(3)],
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'Enter your email',
      validators: [Validators.required, Validators.email],
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'Enter your password',
      validators: [Validators.required, Validators.pattern(/[0-9a-zA-Z]{4,10}/)],
    },
    {
      name: 'confirmPassword',
      label: 'Confirm Password',
      type: 'password',
      placeholder: 'Confirm your password',
      validators: [Validators.required],
    },
  ];
  

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private auth: AuthService
  ) {
    this.initializeForm();
  }

  private initializeForm() {
    const controls: { [key: string]: FormControl } = {};

    this.formFields.forEach((field) => {
      controls[field.name] = new FormControl('', field.validators);
    });

    this.signUpForm = this.fb.group(controls, {
      validators: this.passwordMatchValidator.bind(this),
    });
  }

  private passwordMatchValidator(group: AbstractControl): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  async onSubmit() {
    this.submitted = true;

    if (this.signUpForm.valid) {
      const { username, email, password } = this.signUpForm.value;

      try {
        const result = await this.auth.register(username, email, password);
        console.log('Registration successful:', result);
      } catch (error) {
        console.error('Error during registration:', error);
      }
    } else {
      console.log('Form is invalid');
    }
  }


  get f() {
    return this.signUpForm.controls;
  }
}
