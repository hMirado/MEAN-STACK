import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {group} from "@angular/animations";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

    registerForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
    ) {
        this.createRegisterForm();
    }

    /**
     * Form validation
     */
    createRegisterForm() {
        this.registerForm = this.formBuilder.group({
            email: ['', Validators.compose([
                Validators.required,
                Validators.minLength(10),
                Validators.maxLength(50),
                this.validateEmail
            ])],
            username: ['', Validators.compose([
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(20),
                this.validateUsername
            ])],
            password: ['', Validators.compose([
                Validators.required,
                Validators.minLength(8),
                this.validatePassword
            ])],
            confirmPassword: ['', Validators.required]
        }, {validator: this.matchingPasswords('password', 'confirmPassword')});
    }


    /**
     *  Validation regEx start
     */
    validateEmail(controls) {
        const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        if (regExp.test(controls.value)) return null;
        else return {validateEmail: true};
    }

    validateUsername(controls) {
        const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
        if (regExp.test(controls.value)) return null;
        else return {validateUsername: true};
    }

    validatePassword(controls) {
        const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
        if (regExp.test(controls.value)) return null;
        else return {validatePassword: true};
    }

    /**
     * End of regEx validation
     */


    matchingPasswords(password, confirmPassword) {
        return (group: FormGroup) => {
            if (group.controls[password].value === group.controls[confirmPassword].value) {
                return null;
            } else {
                return {matchingPasswords: true};
            }
        };
    }


    ngOnInit(): void {
    }


    /**
     * Submit function
     */
    onRegisterSubmit() {
        console.log(this.registerForm);
    }

}
