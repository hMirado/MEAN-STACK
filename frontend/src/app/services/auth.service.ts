import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    domain = 'http://localhost:8080';
    // authToken;
    // user;
    headers: any;


    constructor(
        private http: HttpClient
    ) {
    }

    registerUser(user) {
        return this.http.post(this.domain + '/authentication/register', user);
    }

    login(user) {
        return this.http.post(this.domain + '/authentication/login/', user);
    }

    logout() {
        this.deleteToken();
        /*
        this.authToken = null;
        this.user = null;
        localStorage.clear();
         */
    }

    /*
    storeUserData(token, user) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        this.authToken = token;
        this.user = user;
    }
    */

    getProfile() {
        const token = localStorage.getItem('token');
        // this.authToken = token;
        let headers = new HttpHeaders();
        headers = headers.append('authorization', token);
        headers = headers.append('Content-Type', 'application/json');

        return this.http.get(this.domain + '/authentication/profile', {headers});
    }

    setToken(token: string) {
        localStorage.setItem('token', token);
    }

    getToken() {
        return localStorage.getItem('token');
    }

    deleteToken() {
        localStorage.removeItem('token');
    }

    loggedIn() {
        var token = this.getToken();
        const helper = new JwtHelperService();
        return !helper.isTokenExpired(token);
    }
}

