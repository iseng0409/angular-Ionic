import { AuthenticationService } from './../Service/authentication.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { IAuthLoginDto, IAuthResponse } from '../Model/Authentication';
import { catchError, map } from 'rxjs';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, ReactiveFormsModule, CommonModule],
})
export class LoginComponent implements OnInit {
  private route: Router;
  public formGroupLogin: FormGroup;

  public ctrlUsername: FormControl = new FormControl(undefined, [
    Validators.required,
    Validators.minLength(3),
  ]);
  public ctrlPassword: FormControl = new FormControl(undefined, [
    Validators.required,
    Validators.minLength(3),
  ]);
  private authService: AuthenticationService;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) {
    this.route = router;
    this.formGroupLogin = this.formBuilder.group({
      username: this.ctrlUsername,
      password: this.ctrlPassword,
    });
    this.authService = authenticationService;
  }

  ngOnInit() {}
  public async onSubmit() {
    if (this.formGroupLogin.valid) {
      this.authService.Login(<IAuthLoginDto>{}).subscribe({
        next: (response: IAuthResponse) =>
          console.log(
            `User is Successfully Authenticated - Token ${response.accessToken}`
          ),
        error: (err) =>
          console.error(`HTTP Request Failed due to ${err.message}`),
        complete: () => {
          //  always navigate to dashboard component regardless authentication status (failed or succeed)
          //  Flanders background image is implemented on Dashboard component
          // https://im-mining.com/site/wp-content/uploads/2022/05/49592058341_d5f6a98c39_k.jpg
          this.route.navigateByUrl('dashboard');
        },
      });
    } else {
      this.formGroupLogin.markAllAsTouched();
    }
  }
}
