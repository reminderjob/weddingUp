import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Host } from '../_models/host';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  host: Host;
  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group(
      {
        username: ['', Validators.required],
        budgetAmount: ['', [Validators.required, Validators.min(0)]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value
      ? null
      : { mismatch: true };
  }

  register() {
    if (this.registerForm.valid) {
      let user = {};
      user['username'] = this.registerForm.get('username').value;
      user['password'] = this.registerForm.get('password').value;
      let theHost = {};
      theHost['user'] = user;
      theHost['BudgetAmount'] = this.registerForm.get('budgetAmount').value;
      this.authService.register(theHost).subscribe(
        () => {
          this.alertify.success('registration successful');
        },
        (error) => {
          console.log(error);
          this.alertify.error(error);
        },
        () => {
          this.cancel();
        }
      );
    }
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
