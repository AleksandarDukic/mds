import { Component, Input } from "@angular/core";
import { Category } from "src/app/models/category.model";

@Component({
  selector: "app-kanban-category",
  templateUrl: "./kanban-category.component.html",
  styleUrls: ["./kanban-category.component.scss"],
})
export class KanbanCategoryComponent {
  @Input() category!: Category;
}
