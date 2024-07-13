import { Component } from '@angular/core';
import {UserService} from "../../core/services/user/user.service";
import {FormBuilder, Validators} from "@angular/forms";
import {User} from "../../core/interfaces/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {


  constructor(
    private userService: UserService,
    private _fb: FormBuilder,
    private router: Router
  ) {}

  registerForm = this._fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  });

  onRegister() {

    if (!this.registerForm.valid) return

    if (this.registerForm.value.password!== this.registerForm.value.confirmPassword) alert('Passwords do not match');

    const user: User = {
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    }

    this.userService.register(user).subscribe( {
      next: (data: any) => {
        console.log('User registered successfully', data);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify({username: data.user.username, email: data.user.email}));
        this.userService.loginStatusSubject.next(true);

        this.router.navigate(['/home']);
        this.registerForm.reset();
      },
      error: (error: any) => {
        console.error('There was an error!', error);
      }
    })


  }

}
