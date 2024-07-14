import { Component, Input } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { TodoModalComponent } from "../todo-modal/todo-modal.component";
import { Todo } from "../../../core/interfaces/todo";
import { TodoService } from "../../../core/services/todo/todo.service";

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {

  @Input() todoItem: Todo; // Use the Todo interface for type safety

  constructor(
    private dialog: MatDialog,
    private todoService: TodoService,
  ) {}

  editTask(id: number): void {
    const dialogRef = this.dialog.open(TodoModalComponent, {
      width: '500px',
      data: { todoId: id }
    });

    dialogRef.afterClosed().subscribe((result: Todo) => {
      if (result) {
        this.todoService.updateTodo(id, result).subscribe({
          next: (data: Todo) => {
            console.log('Task updated successfully', data);
            this.todoItem = data; // Update the local todoItem
          },
          error: (error: any) => {
            console.error('There was an error updating the task!', error);
          }
        });
      }
    });
  }

  deleteTask(id: number): void {
    this.todoService.deleteTodo(id).subscribe({
      next: () => {
        console.log('Task deleted successfully');
        // Optionally, emit an event to the parent component to remove the item from the list
      },
      error: (error: any) => {
        console.error('There was an error deleting the task!', error);
      }
    });
  }

  setStatus(id: number, todo: Todo): void {
    todo.isComplete = !todo.isComplete;
    this.todoService.setStatus(id, todo).subscribe({
      next: (data: Todo) => {
        console.log('Task status updated successfully', data);
        this.todoItem = data; // Update the local todoItem
      },
      error: (error: any) => {
        console.error('There was an error updating the task status!', error);
      }
    });
  }
}
