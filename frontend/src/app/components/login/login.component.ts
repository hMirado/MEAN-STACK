import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {fadeInAnimation} from '../../animations';
import {AuthGuard} from '../../guards/auth.guard';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    animations: [fadeInAnimation],
})

export class LoginComponent implements OnInit {
    processing = false;
    loginForm: FormGroup;
    previousUrl;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private toastrService: ToastrService,
        private authGuard: AuthGuard
    ) {
        this.createForm();
    }


    ngOnInit(): void {
        if (this.authService.loggedIn())
            this.router.navigateByUrl('/dashboard');

        if (this.authGuard.redirecturl) {
            this.toastrService.warning('You must be logged in to view that page');
            this.previousUrl = this.authGuard.redirecturl;
            this.authGuard.redirecturl = undefined;
        }
    }


    createForm() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }


    onloginSubmit() {
        this.processing = true;
        const user = {
            username: this.loginForm.get('username').value,
            password: this.loginForm.get('password').value
        };


        this.authService.login(user).subscribe((data: any) => {
            if (data.success) {
                console.log(data);
                //this.authService.storeUserData(data.token, data.user);
                this.authService.setToken(data.token);
                this.toastrService.success('Connexion réussi');
                setTimeout(() => {
                    if (this.previousUrl) {
                        this.router.navigate([this.previousUrl]);
                    } else {
                        this.router.navigate(['/dashboard']);
                    }
                }, 3000);
            } else if (!data.succes) {
                this.toastrService.error(data.message);
            }

        }, (error) => {
            console.log(error);
            this.toastrService.error(error.error.message);
        });
    }
}
