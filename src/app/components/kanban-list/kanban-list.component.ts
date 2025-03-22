import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Category } from "src/app/models/category.model";
import { CategoryService } from "src/app/services/category.service";

@Component({
  selector: "app-kanban-list",
  templateUrl: "./kanban-list.component.html",
  styleUrls: ["./kanban-list.component.scss"],
})
export class KanbanListComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  categoriesSub: Subscription | null = null;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoriesSub = this.categoryService
      .getCategoryList()
      .subscribe((categories) => {
        this.categories = categories;
      });
  }

  ngOnDestroy(): void {
    this.categoriesSub?.unsubscribe();
  }
}
