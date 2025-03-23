import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Category } from "src/app/models/category.model";
import { Todo } from "src/app/models/todo.model";
import { CategoryService } from "src/app/services/category.service";
import { TodoService } from "src/app/services/todo.service";

@Component({
  selector: "app-kanban-list",
  templateUrl: "./kanban-list.component.html",
  styleUrls: ["./kanban-list.component.scss"],
})
export class KanbanListComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  categoriesSub: Subscription | null = null;
  todos: Todo[] = [];
  todosSub: Subscription | null = null;

  constructor(
    private categoryService: CategoryService,
    private todoService: TodoService
  ) {}

  ngOnInit(): void {
    this.categoriesSub = this.categoryService
      .getCategoryList()
      .subscribe((categories) => {
        this.categories = categories;
      });

    this.todosSub = this.todoService
      .getTodos()
      .subscribe((todos) => (this.todos = todos));
  }

  ngOnDestroy(): void {
    this.categoriesSub?.unsubscribe();
  }
}
