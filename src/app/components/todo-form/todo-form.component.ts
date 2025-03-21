import { Component } from "@angular/core";
import { TodoService } from "../../services/todo.service";

@Component({
  selector: "app-todo-form",
  template: `
    <div>
      <h2>Add New Todo</h2>
      <form (ngSubmit)="addTodo()">
        <div class="form-group">
          <label for="title">Title</label>
          <input
            type="text"
            id="title"
            class="form-input"
            [(ngModel)]="tittle"
            name="title"
            placeholder="Enter todo title"
            required
          />
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <input
            type="text"
            id="description"
            class="form-input"
            [(ngModel)]="description"
            name="description"
            placeholder="Enter todo description"
          />
        </div>
        <div class="form-group">
          <label for="dueDate">Due Date</label>
          <input
            type="date"
            id="dueDate"
            class="form-input"
            [(ngModel)]="dueDate"
            name="dueDate"
          />
        </div>
        <button type="submit" class="btn btn-primary">Add Todo</button>
      </form>
    </div>
  `,
  styles: [],
})
export class TodoFormComponent {
  title = "";
  description = "";
  dueDate: string | undefined = undefined;

  constructor(private todoService: TodoService) {}

  addTodo() {
    if (this.title.trim()) {
      this.todoService.addTodo({
        id: Date.now().toString(),
        title: this.title,
        description: this.description,
        dueDate: this.dueDate,
        completed: false,
        createdAt: new Date(),
      });
      this.title = "";
      this.description = "";
      this.dueDate = undefined;
    }
  }
}
