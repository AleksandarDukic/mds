import { Pipe, PipeTransform } from "@angular/core";
import { Category } from "../models/category.model";
import { Todo } from "../models/todo.model";
import { environment } from "src/environments/environment.prod";

@Pipe({
  name: "sortTodos",
})
export class SortTodosPipe implements PipeTransform {
  defaultCategory = environment.data.defaultCategory;
  transform(todos: Todo[], category: Category): Todo[] {
    if (category.title === this.defaultCategory)
      return todos.filter((x) => !x.categoryId || x.categoryId === category.id);

    return todos.filter((x) => x.categoryId === category.id);
  }
}
