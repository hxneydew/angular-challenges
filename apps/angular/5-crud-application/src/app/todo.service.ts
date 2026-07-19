import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { randText } from '@ngneat/falso';
import { Observable } from 'rxjs';
import { ToDo } from './todo.interface';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private http = inject(HttpClient);

  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';

  getTodos(): Observable<ToDo[]> {
    return this.http.get<ToDo[]>(this.apiUrl);
  }

  updateTodo(todo: ToDo): Observable<ToDo> {
    return this.http.put<ToDo>(
      `${this.apiUrl}/${todo.id}`,
      {
        ...todo,
        title: randText(),
      },
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    );
  }

  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
