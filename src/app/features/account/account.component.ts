import {Component, OnInit} from '@angular/core';
import {UserService} from "../../core/services/user/user.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";

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
    private fb: FormBuilder
  ) {
  }


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

  accountForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  })

  passwordForm = this.fb.group({
    currentPassword: ['', Validators.required],
    newPassword: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  })

  onSubmit(): void {
    console.log(this.accountForm.value);
  }

  onChangePassword(): void {
    console.log(this.passwordForm.value);
  }
}
