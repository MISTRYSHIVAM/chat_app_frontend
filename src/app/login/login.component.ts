import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user-service/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent {
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private ApiService: UserService
    ) {}
    loginForm!: FormGroup;
    hasError: boolean = false;
    errorMessage: string = '';

    ngOnInit(): void {
        this.loginForm = this.fb.group({
            userName: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(8)]],
        });
    }
    login() {
        this.ApiService.loginUser(this.loginForm.value).subscribe(
            (response: any) => {
                if (
                    response?.statusCode == 400 ||
                    response?.statusCode == 404 ||
                    response.statusCode == 401
                ) {
                    this.hasError = true;
                    this.errorMessage = response.message;
                } else {
                    if (response?.statusCode == 200) {
                        // console.log(response);
                        this.router.navigate(['conversation'], {
                            queryParams: {
                                id: response.userData?._id,
                                userName: response.userData?.userName,
                            },
                        });
                    }
                }
            },
            (error) => {
                console.log(error);
            }
        );
    }
}
