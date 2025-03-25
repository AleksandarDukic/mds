import { Component } from "@angular/core";

@Component({
  selector: "app-todo-page",
  template: `
    <div class="container">
      <h1>Todo App</h1>
      <a [routerLink]="['/kanban']">Kanban</a>
      <div class="card">
        <app-todo-form></app-todo-form>
      </div>
      <div class="card">
        <app-todo-list></app-todo-list>
      </div>
    </div>
  `,
  styles: [],
})
export class TodoPageComponent {}
