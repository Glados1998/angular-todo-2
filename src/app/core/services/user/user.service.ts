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

  /**
   * Registers a new user.
   *
   * @param user - The user object containing registration details.
   * @returns An Observable of the registered user.
   */
  register(user: User) {
    return this.http.post<User>(`${this.apiUrl}/register`, user);
  }

  /**
   * Logs in a user.
   *
   * @param user - An object containing the user's email and password.
   * @returns An Observable of the user login response.
   */
  login(user: { email: string, password: string }) {
    return this.http.post<UserLogin>(`${this.apiUrl}/login`, user).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify({ username: response.user.username, email: response.user.email, id: response.user.id}));
        this.loginStatusSubject.next(true);
      })
    );
  }

  /**
   * Logs out the current user.
   */
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.loginStatusSubject.next(false);
  }

  /**
   * Deletes a user account.
   *
   * @param id - The ID of the user to be deleted.
   * @returns An Observable of the delete operation.
   */
  deleteAccount(id: string) {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

  /**
   * Updates account details of a user.
   *
   * @param data - An object containing the user ID and the data to be updated.
   * @returns An Observable of the update operation.
   */
  updateAccountDetails(data: { id: string, data: any }) {
    return this.http.post(`${this.apiUrl}/update/account-details`, data);
  }

  /**
   * Updates the password of a user.
   *
   * @param data - An object containing the user ID and the new password.
   * @returns An Observable of the update operation.
   */
  updatePassword(data: { id: string, password: string}) {
    return this.http.post(`${this.apiUrl}/update/password`, data);
  }

  /**
   * Retrieves the current login information from local storage.
   *
   * @returns An object containing the user and token if logged in, otherwise null.
   */
  getLogin() {
    const userStr = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (userStr && token) {
      return { user: JSON.parse(userStr), token };
    }
    return null;
  }

  /**
   * Checks if a user is currently logged in.
   *
   * @returns A boolean indicating the login status.
   */
  private isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
