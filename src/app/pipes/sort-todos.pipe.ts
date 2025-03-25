import { Pipe, PipeTransform } from "@angular/core";
import { Category } from "../models/category.model";
import { Todo } from "../models/todo.model";
import { environment } from "src/environments/environment.prod";

@Pipe({
  name: "sortTodos",
  pure: true,
})
export class SortTodosPipe implements PipeTransform {
  defaultCategory = environment.data.defaultCategory;
  transform(todos: Todo[] | null, category: Category): Todo[] {
    if (todos === null) return [];
    if (category.title === this.defaultCategory)
      return todos
        .filter((x) => !x.categoryId || x.categoryId === category.id)
        .sort((a, b) => a.position! - b.position!);

    return todos
      .filter((x) => x.categoryId === category.id)
      .sort((a, b) => a.position! - b.position!);
  }
}
