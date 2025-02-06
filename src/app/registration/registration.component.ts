import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user-service/user.service';
import { cPasswordValidator } from '../validationFn/cpassword.validator';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private userService: UserService
    ) {}
    registrationForm!: FormGroup;
    errorMessage: string = '';
    hasError: boolean = false;

    ngOnInit(): void {
        this.registrationForm = this.fb.group(
            {
                userName: ['', Validators.required],
                password: ['', [Validators.required, Validators.minLength(8)]],
                cPassword: ['', [Validators.required, Validators.minLength(8)]],
            },
            { validator: cPasswordValidator }
        );
    }
    register() {
        // console.log(this.registrationForm.value.userName);
        const un = this.registrationForm.value.userName;
        const pw = this.registrationForm.value.password;
        if (this.registrationForm.valid) {
            this.userService
                .registerUser({
                    userName: un,
                    password: pw,
                })
                .subscribe(
                    (response: any) => {
                        if (response?.statusCode == 409) {
                            this.hasError = true;
                            this.errorMessage = response?.message;
                        } else if (response?.statusCode == 400) {
                            this.hasError = true;
                            this.errorMessage = response?.message;
                        } else if (response?.statusCode == 501) {
                            this.hasError = true;
                            this.errorMessage = response?.message;
                        } else {
                            if (response?.statusCode == 201) {
                                alert(response?.message);
                                this.router.navigate(['conversation']);
                            } else {
                                console.log(response);
                            }
                        }
                    },
                    (error) => {
                        console.log(error);
                    }
                );
        }
    }
}
