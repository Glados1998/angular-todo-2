import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from "../../../core/services/user/user.service";
import { HEADER_LINKS, HEADER_SIDE_LINKS } from "../../../core/data/menu_data";
import { Router } from "@angular/router";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'] // Corrected 'styleUrl' to 'styleUrls'
})
export class HeaderComponent implements OnInit, OnDestroy {

  logins: { user: any, token: string } | null = null; // Initialized to null
  private loginSubscription: Subscription;

  constructor(
    public userService: UserService,
    public router: Router,
  ) {}

  mainMenu = HEADER_LINKS;
  sideMenu = HEADER_SIDE_LINKS;

  ngOnInit(): void {
    this.loginSubscription = this.userService.loginStatus$.subscribe(status => {
      this.logins = status ? this.userService.getLogin() : null;
    });
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }
}
