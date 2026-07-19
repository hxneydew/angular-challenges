import { Component, OnInit, signal } from '@angular/core';
import { ToDo } from './todo.interface';
import { TodoService } from './todo.service';

@Component({
  imports: [],
  selector: 'app-root',
  template: `
    <ul>
      @for (todo of todos(); track todo.id) {
        <li>
          {{ todo.title }}
          <button (click)="update(todo)">Update</button>
          <button (click)="delete(todo)">Delete</button>
        </li>
      }
    </ul>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  constructor(private todoService: TodoService) {}

  todos = signal<ToDo[]>([]);

  ngOnInit(): void {
    this.todoService
      .getTodos()
      .subscribe((toDos: ToDo[]) => this.todos.set(toDos));
  }

  update(todo: ToDo) {
    this.todoService.updateTodo(todo).subscribe((todoUpdated: ToDo) => {
      this.todos.update((items) =>
        items.map((item: ToDo) =>
          item.id === todoUpdated.id ? todoUpdated : item,
        ),
      );
    });
  }

  delete(todo: ToDo): void {
    console.log(todo.id);
    this.todoService.deleteTodo(todo.id).subscribe({
      next: () => {
        this.todos.update((items) =>
          items.filter((item: ToDo) => item.id !== todo.id),
        );
      },
      error: (err) => console.log(err),
    });
  }
}
