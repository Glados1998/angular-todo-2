import {Component, OnInit} from '@angular/core';
import {UserService} from "../../core/services/user/user.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements OnInit {

  logins: { user: any, token: string } | null = null; // Initialized to null
  private loginSubscription: Subscription;

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }


  ngOnInit(): void {
    this.loginSubscription = this.userService.loginStatus$.subscribe(status => {
      this.logins = status ? this.userService.getLogin() : null;
    });
    console.log(this.logins);
  }

  onLogout(): void {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
