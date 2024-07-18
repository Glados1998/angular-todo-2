import { Injectable } from '@angular/core';
import {BehaviorSubject, tap} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {User, UserLogin} from "../../interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/user';
  loginStatusSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  loginStatus$ = this.loginStatusSubject.asObservable();

  constructor(private http: HttpClient) {}

  register(user: User) {
    return this.http.post<User>(`${this.apiUrl}/register`, user);
  }

  login(user: { email: string, password: string }) {
    return this.http.post<UserLogin>(`${this.apiUrl}/login`, user).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify({ username: response.user.username, email: response.user.email, id: response.user.id}));
        this.loginStatusSubject.next(true);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.loginStatusSubject.next(false);
  }

  deleteAccount(id: string) {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

  updateAccountDetails(data: { id: string, data: any }) {
    return this.http.post(`${this.apiUrl}/update/account-details`, data);
  }

  updatePassword(data: { id: string, password: string}) {
    return this.http.post(`${this.apiUrl}/update/password`, data);
  }

  getLogin() {
    const userStr = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (userStr && token) {
      return { user: JSON.parse(userStr), token };
    }
    return null;
  }

  private isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
