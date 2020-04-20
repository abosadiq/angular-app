import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";

import { AlertService } from "../../services/alert.service";
import { AuthenticationService } from "../../services/auth.service";
import { ServicesService } from "../../services/services.service";
@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: ServicesService,
    private alertService: AlertService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(["/"]);
    }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      username: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    // here i am sending form values to auth service .
    this.loading = true;
    if (this.registerForm.value) {
      this.authenticationService.signup(this.registerForm.value);
      setTimeout(() => {
        this.loading = false;
      }, 1000);
      // this.alertService.success("Registration successful", true);
      // this.router.navigate(["/login"]);
    } else {
      this.alertService.error("Error");
      //       this.loading = false;
    }

    // this.userService
    //   .register(this.registerForm.value)
    //   .pipe(first())
    //   .subscribe(
    //     (data) => {
    //       this.alertService.success("Registration successful", true);
    //       this.router.navigate(["/login"]);
    //     },
    //     (error) => {
    //       this.alertService.error(error);
    //       this.loading = false;
    //     }
    //   );
  }
}
