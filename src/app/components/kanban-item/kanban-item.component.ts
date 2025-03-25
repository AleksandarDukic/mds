import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Todo } from "src/app/models/todo.model";

@Component({
  selector: "app-kanban-item",
  templateUrl: "./kanban-item.component.html",
  styleUrls: ["./kanban-item.component.scss"],
})
export class KanbanItemComponent {
  @Input() item!: Todo;
  @Output() onDeleteItem: EventEmitter<string> = new EventEmitter<string>();
  deleteItem(event: Event) {
    event.stopPropagation();
    this.onDeleteItem.emit(this.item.id);
  }
  formatDate(date: string): string {
    if (!date) return "";
    return new Date(date).toLocaleDateString();
  }
}
