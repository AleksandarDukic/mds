import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Category } from "src/app/models/category.model";
import { Todo } from "src/app/models/todo.model";
import { CategoryService } from "src/app/services/category.service";
import { TodoService } from "src/app/services/todo.service";

@Component({
  selector: "app-category-create-dialog",
  template: `
    <div class="p-5">
      <h2>{{ isCreateMode ? "Add New Todo" : "Update Todo" }}</h2>
      <form (ngSubmit)="saveTodo()">
        <div class="form-group">
          <label for="title">Title</label>
          <input
            type="text"
            id="title"
            class="form-input"
            [(ngModel)]="title"
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
        <div
          *ngIf="!isCreateMode"
          class="form-group w-100 d-flex justify-content-between align-items-center"
        >
          <label for="completed">Completed</label>
          <input
            type="checkbox"
            class="checkbox"
            [checked]="completed"
            (change)="toggleComplete()"
          />
        </div>
        <button type="submit" class="btn btn-primary">
          {{ isCreateMode ? "Add Todo" : "Save" }}
        </button>
      </form>
    </div>
  `,
  styles: [],
})
export class CreateEditTodoDialogComponent {
  isCreateMode: boolean = false;
  title = "";
  description = "";
  dueDate: string | undefined = undefined;
  completed: boolean = false;
  constructor(
    private todoService: TodoService,
    private dialogRef: MatDialogRef<CreateEditTodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public todo: Todo
  ) {
    this.isCreateMode = todo.title === "";
    if (!this.isCreateMode) {
      this.title = todo.title;
      this.description = todo.description;
      this.dueDate = todo.dueDate;
      this.completed = todo.completed;
    }
  }

  saveTodo() {
    if (!this.title.trim()) return;
    this.isCreateMode ? this.addTodo() : this.updateTodo();
    this.dialogRef.close();
  }

  toggleComplete() {
    this.completed = !this.completed;
  }

  private addTodo() {
    this.todoService.addTodo(
      {
        id: Date.now().toString(),
        title: this.title,
        description: this.description,
        dueDate: this.dueDate,
        completed: false,
        createdAt: new Date(),
      },
      this.todo.categoryId
    );
    this.title = "";
    this.description = "";
    this.dueDate = undefined;
  }

  private updateTodo() {
    this.todo!.title = this.title;
    this.todo.description = this.description;
    this.todo.dueDate = this.dueDate;
    this.todo.completed = this.completed;
    this.todoService.updateTodo(this.todo!);
  }
}
