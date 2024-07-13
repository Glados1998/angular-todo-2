import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../core/services/user/user.service";
import {HEADER_LINKS, HEADER_SIDE_LINKS} from "../../../core/data/menu_data";
import {UserDataService} from "../../services/user-data.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{


  constructor(
    public userService: UserService,
  ) {
  }

  mainMenu = HEADER_LINKS;
  sideMenu = HEADER_SIDE_LINKS;

  ngOnInit() {
    const user = this.userService.getUser();
  }

}
