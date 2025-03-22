import { Component, OnInit } from "@angular/core";
import { TodoService } from "./services/todo.service";

@Component({
  selector: "app-root",
  template: `<router-outlet></router-outlet>`,
  styles: [],
})
export class AppComponent implements OnInit{
  title = "todo-angular";

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.loadTodos();
  }
}
