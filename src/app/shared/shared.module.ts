import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {TodoFormComponent} from "./components/todo-form/todo-form.component";
import {HeaderComponent} from "./components/header/header.component";
import {TodoItemComponent} from "./components/todo-item/todo-item.component";
import {TodoModalComponent} from "./components/todo-modal/todo-modal.component";
import {FooterComponent} from "./components/footer/footer.component";


@NgModule({
  declarations: [
    HeaderComponent,
    TodoFormComponent,
    TodoItemComponent,
    TodoModalComponent,
    FooterComponent
  ],
  exports: [
    HeaderComponent,
    TodoFormComponent,
    TodoItemComponent,
    TodoModalComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatMenuModule,
  ]
})
export class SharedModule {
}
