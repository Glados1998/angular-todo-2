import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/user';

  constructor(private http: HttpClient) {
  }

  registerUser(user: User) {
    return this.http.post<User>(`${this.apiUrl}/register`, user);
  }

  loginUser(user: User) {
    return this.http.post<User>(`${this.apiUrl}/login`, user);
  }

  logoutUser() {
  }

  getUserProfile() {
  }

  deleteUser(id: string) {
  }


}
