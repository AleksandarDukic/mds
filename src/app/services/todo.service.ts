import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, Observable } from "rxjs";
import { Todo } from "../models/todo.model";
import { LocalStorageService } from "./local-storage.service";
import { environment } from "src/environments/environment.prod";

@Injectable({
  providedIn: "root",
})
export class TodoService {
  private todos: Todo[] = [];
  private todosSubject = new BehaviorSubject<Todo[]>([]);

  constructor(private localStorageService: LocalStorageService) {}

  getTodos(): Observable<Todo[]> {
    return this.todosSubject.asObservable();
  }

  addTodo(todo: Todo): void {
    const todosTemp = [...this.todos, todo];

    try {
      this.localStorageService.add(environment.data.todos, todo);
      this.todos = todosTemp;
      this.todosSubject.next(this.todos);
    } catch (err) {
      console.error(err);
    }
  }

  toggleTodo(id: string): void {
    const todosTemp = this.todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );

    try {
      this.localStorageService.save<Todo[]>(environment.data.todos, todosTemp);
      this.todos = todosTemp;
      this.todosSubject.next(this.todos);
    } catch (err) {
      console.error(err);
    }
  }

  deleteTodo(id: string): void {
    const todosTemp = this.todos.filter((todo) => todo.id !== id);
    try {
      this.localStorageService.save<Todo[]>(environment.data.todos, todosTemp);
      this.todos = todosTemp;
      this.todosSubject.next(this.todos);
    } catch (err) {
      console.error(err);
    }
  }

  loadTodos() {
    const localStorageTodos =
      this.localStorageService.get<Todo[]>(environment.data.todos) || [];
    this.todos = localStorageTodos;
    this.todosSubject.next(this.todos);
  }
}
