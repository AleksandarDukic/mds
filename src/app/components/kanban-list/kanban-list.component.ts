import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { Category } from "src/app/models/category.model";
import { Todo } from "src/app/models/todo.model";
import { CategoryService } from "src/app/services/category.service";
import { TodoService } from "src/app/services/todo.service";
import { environment } from "src/environments/environment";
import { CreateEditTodoDialogComponent } from "../create-edit-todo-dialog/create-edit-todo-dialog.component";

@Component({
  selector: "app-kanban-list",
  templateUrl: "./kanban-list.component.html",
  styleUrls: ["./kanban-list.component.scss"],
})
export class KanbanListComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  categoriesSub: Subscription | null = null;
  todos: Todo[] = [];
  todosSub: Subscription | null = null;

  todos$ = this.todoService.getTodos();
  categories$ = this.categoryService.getCategoryList();

  constructor(
    private categoryService: CategoryService,
    private todoService: TodoService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.categoriesSub = this.categoryService
      .getCategoryList()
      .subscribe((categories) => {
        this.categories = categories;
      });

    this.todosSub = this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos;
    });
  }

  ngOnDestroy(): void {
    this.categoriesSub?.unsubscribe();
    this.todosSub?.unsubscribe();
  }

  listDrop(event: CdkDragDrop<undefined>) {
    const { previousIndex, currentIndex } = event;
    if (previousIndex === currentIndex) return;
    moveItemInArray(this.categories!, previousIndex, currentIndex);
    this.categoryService.updateCategories(this.categories);
  }

  drop(event: CdkDragDrop<Todo[]>, destinationCategory: Category) {
    const { previousIndex, currentIndex, container, previousContainer } = event;

    if (container === previousContainer) {
      if (previousIndex === currentIndex) return;
      this.todoService.inCategoryTransfer(
        previousIndex,
        currentIndex,
        destinationCategory
      );
    } else {
      const todo = this.todos.find(
        (x) => x.id === event.item.element.nativeElement.id
      );
      if (todo) {
        this.todoService.betweenCategoriesTransfer(
          todo,
          currentIndex,
          destinationCategory
        );
      }
    }
  }

  deleteCategory(category: Category) {
    this.todoService.moveToDefaultCategory(category);
    this.categoryService.deleteCategory(category);
  }

  deleteItem(id: string) {
    console.log("delete ", id);
    this.todoService.deleteTodo(id);
  }

  onAddTodo(categoryId: string) {
    this.openDialog(this.todoService.createEmptyTodo(categoryId));
  }

  onEditTodo(todo: Todo) {
    this.openDialog(todo);
  }

  openDialog(todo?: Todo): void {
    const dialogRef = this.dialog.open(CreateEditTodoDialogComponent, {
      data: todo,
    });
  }

  get defaultCategoryId() {
    return environment.data.defaultCategoryId;
  }
}
