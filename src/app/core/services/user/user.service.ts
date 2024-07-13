import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User, UserLogin} from "../../interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/user';

  constructor(private http: HttpClient) {
  }

  register(user: User) {
    return this.http.post<User>(`${this.apiUrl}/register`, user);
  }

  login(user: { email: string, password: string }) {
    return this.http.post<UserLogin>(`${this.apiUrl}/login`, user);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  deleteUser(id: string) {
    return this.http.delete<User>(`${this.apiUrl}/delete/${id}`);
  }

  getUser() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  }

}
