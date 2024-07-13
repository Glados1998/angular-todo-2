import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../core/services/user/user.service";
import {FormBuilder, Validators} from "@angular/forms";
import {UserLogin} from "../../core/interfaces/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {
  }

  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });


  onLogin() {
    this.userService.login(this.loginForm.value as UserLogin).subscribe( {
      next: (data: any) => {
        console.log('User logged in successfully', data);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify({username: data.user.username, email: data.user.email}));
        this.router.navigate(['/home']);
        this.loginForm.reset();
      },
      error: (error: any) => {
        console.error('There was an error!', error);
      }
    });
  }

}
