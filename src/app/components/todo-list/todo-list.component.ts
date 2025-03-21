import { Component, OnInit } from "@angular/core";
import { Todo } from "../../models/todo.model";
import { TodoService } from "../../services/todo.service";

@Component({
  selector: "app-todo-list",
  template: `
    <div>
      <div class="header">
        <h2>My Todos</h2>
        <div>
          <button class="btn btn-primary" (click)="setFilter('all')">
            All
          </button>
          <button class="btn btn-primary" (click)="setFilter('active')">
            Active
          </button>
          <button class="btn btn-primary" (click)="setFilter('completed')">
            Completed
          </button>
        </div>
      </div>
      <div *ngIf="filteredTodos.length === 0" class="empty-list">
        <p>No todos found.</p>
      </div>
      <ng-container *ngIf="filteredTodos.length > 0">
        <app-todo-item
          *ngFor="let todo of filteredTodos"
          [todo]="todo"
        ></app-todo-item>
      </ng-container>
    </div>
  `,
  styles: [],
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  filter: string = "all";
  filteredTodos: Todo[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos;
      this.applyFilter();
    });
  }

  setFilter(filterType: string): void {
    this.filter = filterType;
    this.applyFilter();
  }

  applyFilter(): void {
    if (this.filter === "active") {
      this.filteredTodos = this.todos.filter((todo) => !todo.completed);
    } else if (this.filter === "completed") {
      this.filteredTodos = this.todos.filter((todo) => todo.completed);
    } else {
      this.filteredTodos = [...this.todos];
    }
  }
}
