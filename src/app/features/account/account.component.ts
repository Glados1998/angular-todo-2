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

  logins: { user: any, token: string } | null = null;
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

    this.accountForm.patchValue({
      username: this.logins.user.username,
      email: this.logins.user.email
    });

  }

  onLogout(): void {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

  onDeleteAccount(): void {
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

  onChangedDetails(): void {
    if (!this.accountForm.valid) return console.error('Form is invalid');

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

  onChangePassword(): void {
    if (!this.passwordForm.valid) return console.error('Form is invalid');

    if (this.passwordForm.value.newPassword !== this.passwordForm.value.confirmPassword) return console.error('New passwords do not match');


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

  accountForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  })

  passwordForm = this.fb.group({
    newPassword: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  })


}
