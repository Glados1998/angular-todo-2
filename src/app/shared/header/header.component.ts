import {Component} from '@angular/core';
import {HEADER_LINKS, HEADER_SIDE_LINKS} from "../../core/data/menu_data";
import {UserService} from "../../core/services/user/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(
    public userService: UserService
  ) {
  }

  mainMenu = HEADER_LINKS;
  sideMenu = HEADER_SIDE_LINKS;

}
