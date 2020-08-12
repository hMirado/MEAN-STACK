import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    redirecturl

    constructor(private authService: AuthService, private router: Router) {
    }

    canActivate(
        //next: ActivatedRouteSnapshot,
        router: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.authService.loggedIn()) {
            return true;
        }

        this.redirecturl = state.url
        this.router.navigate(['/login']);
        return false;
    }
}
