import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Category } from "../models/category.model";
import { LocalStorageService } from "./local-storage.service";
import { BehaviorSubject } from "rxjs";
import { Title } from "@angular/platform-browser";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  private categories: Category[] = [];
  private categoriesSubject = new BehaviorSubject<Category[]>([]);

  constructor(private localStorageService: LocalStorageService) {}

  loadCategories() {
    let categoriesTemp =
      this.localStorageService.get<Category[]>(environment.data.categories) ||
      [];

    this.categories = this.categories.concat(categoriesTemp);
    this.categoriesSubject.next(this.categories);

    // if Default category doesn't exist - create it
  }

  getCategoryList() {
    return this.categoriesSubject.asObservable();
  }

  addCategory(category: Category) {
    category.position = this.categories.length;
    const categoriesTemp = [...this.categories, category];

    try {
      // add new category to list of categories
      this.localStorageService.save<Category[]>(
        environment.data.categories,
        categoriesTemp
      );
      this.categories = categoriesTemp;
      this.categoriesSubject.next(this.categories);

      // create empty category column
      this.localStorageService.save<string[]>(category.title, []);
    } catch (err) {
      console.error(err);
    }
  }

  createDefaultCategory(): Category {
    return {
      title: environment.data.defaultCategory,
      id: Date.now().toString(),
    };
  }
}
