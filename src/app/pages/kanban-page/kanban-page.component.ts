import { Component } from "@angular/core";
import { CreateCategoryDialogComponent } from "src/app/components/create-category-dialog/create-category-dialog.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-kanban-page",
  templateUrl: "kanban-page.component.html",
  styleUrls: ["./kanban-page.component.scss"],
})
export class KanbanPageComponent {
  constructor(private dialog: MatDialog) {}

  openAddCategoryDialog() {
    const dialogRef = this.dialog.open(CreateCategoryDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
