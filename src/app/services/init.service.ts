import { Injectable } from "@angular/core";
import { LocalStorageService } from "./local-storage.service";
import { environment } from "src/environments/environment";
import { Todo } from "../models/todo.model";
import { TodoService } from "./todo.service";
import { Category } from "../models/category.model";
import { CategoryService } from "./category.service";

@Injectable({
  providedIn: "root",
})
export class InitService {
  constructor(
    private localStorageService: LocalStorageService,
    private todoService: TodoService,
    private categoryService: CategoryService
  ) {}

  init() {
    if (!this.todosExist()) this.createTodoList();
    if (!this.categoriesExist()) this.createCategoriesList();
    this.todoService.loadTodos();
    this.categoryService.loadCategories();
  }

  todosExist(): boolean {
    return !!this.localStorageService.get<Todo[]>(environment.data.todos);
  }

  categoriesExist(): boolean {
    return !!this.localStorageService.get<Category[]>(
      environment.data.categories
    );
  }

  createTodoList() {
    this.localStorageService.save<Todo[]>(environment.data.todos, []);
  }

  createCategoriesList() {
    this.localStorageService.save<Category[]>(environment.data.categories, [
      this.categoryService.createDefaultCategory(),
    ]);
    // add default category to all todos
  }
}
