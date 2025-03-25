import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, Observable } from "rxjs";
import { Todo } from "../models/todo.model";
import { LocalStorageService } from "./local-storage.service";
import { environment } from "src/environments/environment.prod";
import { CategoryService } from "./category.service";
import { Category } from "../models/category.model";

@Injectable({
  providedIn: "root",
})
export class TodoService {
  private todos: Todo[] = [];
  private todosSubject = new BehaviorSubject<Todo[]>([]);

  constructor(
    private localStorageService: LocalStorageService,
    private categoryService: CategoryService
  ) {}

  getTodos(): Observable<Todo[]> {
    return this.todosSubject.asObservable();
  }

  addTodo(todo: Todo, categoryId?: string): void {
    const categoryTodosNumber = this.categoryTodosCount(categoryId);
    todo.position = categoryTodosNumber;
    todo.categoryId = categoryId || environment.data.defaultCategoryId;
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
    const erasedTodo = this.todos.find((todo) => todo.id === id);
    if (erasedTodo) {
      this.sortOriginCategory(erasedTodo.categoryId!, erasedTodo.position!);
    }

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

  createEmptyTodo(categoryId?: string): Todo {
    return {
      id: Date.now().toString(),
      title: "",
      description: "",
      dueDate: "",
      completed: false,
      createdAt: new Date(),
      categoryId: categoryId,
    };
  }

  updateTodo(todo: Todo) {
    const todoToUpdate = this.todos.find((x) => x.id === todo.id);
    if (todoToUpdate) {
      todoToUpdate!.title = todo.title;
      todoToUpdate!.description = todo.description;
      todoToUpdate!.dueDate = todo.dueDate;
    }

    this.persistTodos();
  }

  categoryTodosCount(categoryId: string = environment.data.defaultCategoryId) {
    return this.todos.filter(
      (x) => !x.categoryId || x.categoryId === categoryId
    ).length;
  }

  inCategoryTransfer(prevIndex: number, currIndex: number, category: Category) {
    this.todos
      .filter((x) => x.categoryId === category.id)
      .find((x) => x.position === prevIndex)!.position = +Infinity;
    if (prevIndex > currIndex) {
      this.todos
        .filter(
          (x) =>
            x.categoryId === category.id &&
            x.position! >= currIndex &&
            x.position! < prevIndex
        )
        .forEach((x) => x.position!++);
    } else {
      this.todos
        .filter(
          (x) =>
            x.categoryId === category.id &&
            x.position! > prevIndex &&
            x.position! <= currIndex
        )
        .forEach((x) => x.position!--);
    }
    this.todos
      .filter((x) => x.categoryId === category.id)
      .find((x) => x.position === +Infinity)!.position = currIndex;
    this.persistTodos();
  }

  betweenCategoriesTransfer(
    todo: Todo,
    newPositionIndex: number,
    destinationCategory: Category
  ) {
    this.sortOriginCategory(todo.categoryId!, todo.position!);
    this.transferTodoIntoCategory(todo, newPositionIndex, destinationCategory);

    this.persistTodos();
  }

  moveToDefaultCategory(category: Category) {
    const defaultCategorySize = this.todos.filter(
      (x) => x.categoryId === environment.data.defaultCategoryId
    ).length;

    this.todos
      .filter((x) => x.categoryId === category.id)
      .forEach((x, index) => {
        (x.categoryId = environment.data.defaultCategoryId),
          (x.position = defaultCategorySize + index);
      });
    this.persistTodos();
  }

  private transferTodoIntoCategory(
    todo: Todo,
    newPositionIndex: number,
    category: Category
  ) {
    // increase existing elements position by 1
    this.todos
      .filter(
        (x) => x.categoryId === category.id && x.position! >= newPositionIndex
      )
      .forEach((x) => x.position!++);

    // update Todo
    const todoToUpdate = this.todos.find((x) => x.id === todo.id)!;

    todoToUpdate.categoryId = category.id;
    todoToUpdate.position = newPositionIndex;
  }

  private sortOriginCategory(
    categoryId: string,
    transferedItemPosition: number
  ) {
    this.todos
      .filter(
        (x) =>
          x.categoryId === categoryId && x.position! > transferedItemPosition
      )
      .forEach((x) => x.position!--);
  }

  private persistTodos() {
    this.localStorageService.save<Todo[]>(environment.data.todos, this.todos);
    this.todosSubject.next([...this.todos]);
  }
}
