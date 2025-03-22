import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
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
    this.persistTodos(todosTemp);
    }
    catch(err) {
      console.error(err);
    }
  }

  toggleTodo(id: string): void {
    const todosTemp = this.todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  
  try {
      this.persistTodos(todosTemp);

    } catch(err) {
        console.error(err);
    }
  }

  deleteTodo(id: string): void {
    const todosTemp  = this.todos.filter((todo) => todo.id !== id);
    try {
      this.persistTodos(todosTemp);
    }
    catch(err) {
      console.error(err);
    }
  }

  loadTodos() {
    const todosTemp = this.localStorageService.get<Todo[]>(environment.dataTableNames.todos) || [];
    this.todos = todosTemp;
    this.todosSubject.next(this.todos);
  }

  persistTodos(todos: Todo[]) {
    this.localStorageService.save<Todo[]>(environment.dataTableNames.todos, todos);
    this.todos = todos;
    this.todosSubject.next(this.todos);
  }
}
