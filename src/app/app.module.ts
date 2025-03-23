import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TodoFormComponent } from "./components/todo-form/todo-form.component";
import { TodoItemComponent } from "./components/todo-item/todo-item.component";
import { TodoListComponent } from "./components/todo-list/todo-list.component";
import { TodoPageComponent } from "./pages/todo-page/todo-page.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { KanbanPageComponent } from "./pages/kanban-page/kanban-page.component";
import { CreateCategoryDialogComponent } from "./components/create-category-dialog/create-category-dialog.component";
import { MatDialogModule } from "@angular/material/dialog";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { KanbanListComponent } from "./components/kanban-list/kanban-list.component";
import { KanbanCategoryComponent } from "./components/kanban-category/kanban-category.component";
import { KanbanItemComponent } from "./components/kanban-item/kanban-item.component";
import { SortTodosPipe } from "./pipes/sort-todos.pipe";

@NgModule({
  declarations: [
    AppComponent,
    TodoItemComponent,
    TodoPageComponent,
    TodoFormComponent,
    TodoListComponent,
    KanbanPageComponent,
    CreateCategoryDialogComponent,
    KanbanListComponent,
    KanbanCategoryComponent,
    KanbanItemComponent,
    SortTodosPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatDialogModule,
    DragDropModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
