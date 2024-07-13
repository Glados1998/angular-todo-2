import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TodoComponent} from './todo/todo.component';
import {CoreModule} from "../core/core.module";
import {SharedModule} from "../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AccountComponent} from './account/account.component';
import {RouterLink} from "@angular/router";


@NgModule({
  declarations: [
    TodoComponent,
    LoginComponent,
    RegisterComponent,
    AccountComponent,
  ],
  exports: [
    TodoComponent,
    LoginComponent,
    RegisterComponent,
    AccountComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    ReactiveFormsModule,
    RouterLink,
  ]
})
export class FeaturesModule {
}
