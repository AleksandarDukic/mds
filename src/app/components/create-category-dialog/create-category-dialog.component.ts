import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { CategoryService } from "src/app/services/category.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-category-create-dialog",
  template: `
    <div class="p-5">
      <h2>Add Category</h2>
      <form (ngSubmit)="addCategory()">
        <div class="form-group mb-5">
          <label for="title" class="mb-2">Title</label>
          <input
            type="text"
            id="title"
            class="form-input"
            [(ngModel)]="title"
            name="title"
            placeholder="Enter category title"
            required
          />
        </div>

        <button type="submit" class="btn btn-primary">Add Category</button>
      </form>
    </div>
  `,
  styles: [],
})
export class CreateCategoryDialogComponent {
  title = "";
  constructor(
    private categoryService: CategoryService,
    private dialogRef: MatDialogRef<CreateCategoryDialogComponent>
  ) {}

  addCategory() {
    if (
      this.title.trim() &&
      this.title.toLocaleLowerCase() !=
        environment.data.defaultCategory.toLocaleLowerCase()
    ) {
      this.categoryService.addCategory({
        title: this.title,
        id: Date.now().toString(),
      });
      this.dialogRef.close();
    }
  }
}
