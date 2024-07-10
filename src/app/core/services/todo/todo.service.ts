import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {interval, switchMap} from "rxjs";
import {Todo} from "../../interfaces/todo";

/**
 * Service for managing Todo items.
 */
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:3000/todos';

  constructor(private http: HttpClient) {
  }

  /**
   * Watch for changes in Todo items every 3 seconds.
   *
   * @returns An Observable that emits an array of Todo items.
   */
  watchTodo() {
    return interval(3000).pipe(switchMap(() => this.getTodos()));
  }

  /**
   * Fetch all Todo items from the server.
   *
   * @returns An Observable that emits an array of Todo items.
   */
  getTodos() {
    return this.http.get<Todo[]>(`${this.apiUrl}`);
  }

  /**
   * Fetch a single Todo item by its ID from the server.
   *
   * @param id - The ID of the Todo item to fetch.
   * @returns An Observable that emits a single Todo item.
   */
  getTodoById(id: number) {
    return this.http.get<Todo>(`${this.apiUrl}/${id}`);
  }

  /**
   * Add a new Todo item to the server.
   *
   * @param data - The Todo item to add.
   * @returns An Observable that emits the added Todo item.
   */
  addTodo(data: Todo) {
    return this.http.post<Todo>(`${this.apiUrl}`, data);
  }

  /**
   * Update an existing Todo item on the server.
   *
   * @param id - The ID of the Todo item to update.
   * @param updatedData - The updated Todo item.
   * @returns An Observable that emits the updated Todo item.
   */
  updateTodo(id: number, updatedData: Todo) {
    return this.http.put<Todo>(`${this.apiUrl}/${id}`, updatedData);
  }

  /**
   * Delete a Todo item from the server.
   *
   * @param id - The ID of the Todo item to delete.
   * @returns An Observable that emits nothing.
   */
  deleteTodo(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  /**
   * Mark a Todo item as complete on the server.
   *
   * @param id - The ID of the Todo item to mark as complete.
   * @param updatedData - The updated Todo item (with the completed flag set to true).
   * @returns An Observable that emits the updated Todo item.
   */
  completeTodo(id: number, updatedData: Todo) {
    return this.http.put<Todo>(`${this.apiUrl}/${id}/complete`, updatedData);
  }
}
