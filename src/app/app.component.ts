import { Component, OnInit } from "@angular/core";
import { TodoService } from "./services/todo.service";
import { CategoryService } from "./services/category.service";

@Component({
  selector: "app-root",
  template: `<router-outlet></router-outlet>`,
  styles: [],
})
export class AppComponent implements OnInit {
  title = "todo-angular";

  constructor(
    private todoService: TodoService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.todoService.loadTodos();
    this.categoryService.loadCategoryList();
  }
}
