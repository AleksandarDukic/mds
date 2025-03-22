import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TodoPageComponent } from "./pages/todo-page/todo-page.component";
import { KanbanPageComponent } from "./pages/kanban-page/kanban-page.component";


const routes: Routes = [
  { path: "", component: TodoPageComponent },
  { path: "todos", component: TodoPageComponent },
  { path: "kanban", component: KanbanPageComponent },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
