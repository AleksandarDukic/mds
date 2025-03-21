import { Component, Input } from "@angular/core";
import { Todo } from "../../models/todo.model";
import { TodoService } from "../../services/todo.service";

@Component({
  selector: "app-todo-item",
  template: `
    <div class="todo-item" [ngClass]="{ completed: todo.completed }">
      <input
        type="checkbox"
        class="checkbox"
        [checked]="todo.completed"
        (change)="toggleComplete()"
      />
      <div class="todo-content">
        <h3>{{ todo.title }}</h3>
        <p *ngIf="todo.description">{{ todo.description }}</p>
        <p *ngIf="todo.dueDate" class="due-date">
          Due: {{ formatDate(todo.dueDate) }}
        </p>
      </div>
      <div class="todo-actions">
        <button class="btn btn-danger" (click)="deleteTodo()">Delete</button>
      </div>
    </div>
  `,
  styles: [],
})
export class TodoItemComponent {
  @Input() todo!: Todo;

  constructor(private todoService: TodoService) {}

  toggleComplete(): void {
    this.todoService.toggleTodo(this.todo.id);
  }

  deleteTodo(): void {
    this.todoService.deleteTodo(this.todo.id);
  }

  formatDate(date: string): string {
    if (!date) return "";
    return new Date(date).toLocaleDateString();
  }
}
