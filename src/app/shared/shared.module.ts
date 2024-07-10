import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {TodoFormComponent} from "./todo-form/todo-form.component";
import {ReactiveFormsModule} from "@angular/forms";
import {TodoItemComponent} from "./todo-item/todo-item.component";
import {TodoModalComponent} from "./todo-modal/todo-modal.component";
import {RouterLink} from "@angular/router";
import { FooterComponent } from './footer/footer.component';


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
    ]
})
export class SharedModule {
}
