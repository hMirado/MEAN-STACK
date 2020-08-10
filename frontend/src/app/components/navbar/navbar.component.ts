import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    constructor(
        public authService: AuthService,
        private router: Router,
        private toastrService: ToastrService
    ) {
    }

    ngOnInit(): void {
    }

    onLogoutClick() {
        this.authService.logout();
        this.toastrService.info('Déconnexion réussi');
        this.router.navigate(['/']);
    }

}
