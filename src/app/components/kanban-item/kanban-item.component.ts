import { Component, Input } from "@angular/core";
import { Todo } from "src/app/models/todo.model";

@Component({
  selector: "app-kanban-item",
  templateUrl: "./kanban-item.component.html",
  styleUrls: ["./kanban-item.component.scss"],
})
export class KanbanItemComponent {
  @Input() item!: Todo;
}
