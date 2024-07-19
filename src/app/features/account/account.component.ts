import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from "../../core/services/user/user.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, OnDestroy {

  logins: { user: any, token: string } | null = null;
  private loginSubscription: Subscription;

  accountForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });

  passwordForm = this.fb.group({
    newPassword: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  });

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginSubscription = this.userService.loginStatus$.subscribe(status => {
      this.logins = status ? this.userService.getLogin() : null;
      if (this.logins) {
        this.accountForm.patchValue({
          username: this.logins.user.username,
          email: this.logins.user.email
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

  onLogout(): void {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

  onDeleteAccount(): void {
    if (this.logins) {
      this.userService.deleteAccount(this.logins.user.id).subscribe({
        next: (data: any) => {
          console.log('User deleted successfully', data);
          this.userService.logout();
          this.router.navigate(['/login']);
        },
        error: (error: any) => {
          console.error('There was an error!', error);
        }
      });
    }
  }

  onChangedDetails(): void {
    if (this.accountForm.invalid) {
      return console.error('Form is invalid');
    }

    if (this.logins) {
      this.userService.updateAccountDetails({
        id: this.logins.user.id,
        data: this.accountForm.value
      }).subscribe({
        next: (data: any) => {
          console.log('Details updated successfully', data);
        },
        error: (error: any) => {
          console.error('There was an error!', error);
        }
      });
    }
  }

  onChangePassword(): void {
    if (this.passwordForm.invalid) {
      return console.error('Form is invalid');
    }

    if (this.passwordForm.value.newPassword !== this.passwordForm.value.confirmPassword) {
      return console.error('New passwords do not match');
    }

    if (this.logins) {
      this.userService.updatePassword({
        id: this.logins.user.id,
        password: this.passwordForm.value.newPassword
      }).subscribe({
        next: (data: any) => {
          console.log('Password updated successfully', data);
          this.passwordForm.reset();
        },
        error: (error: any) => {
          console.error('There was an error!', error);
        }
      });
    }
  }
}
