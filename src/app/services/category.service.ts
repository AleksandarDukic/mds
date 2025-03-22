import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Category } from "../models/category.model";
import { LocalStorageService } from "./local-storage.service";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  private categories: Category[] = [];
  private categoriesSubject = new BehaviorSubject<Category[]>([]);

  constructor(private localStorageService: LocalStorageService) {}

  loadCategoryList() {
    const categoriesTemp =
      this.localStorageService.get<Category[]>(
        environment.dataTableNames.categories
      ) || [];

    if (
      categoriesTemp.length === 0 ||
      !this.defaultCategoryExists(categoriesTemp)
    ) {
      categoriesTemp.push(this.initDefaultCategories());
    }

    this.categories = categoriesTemp;
    this.categoriesSubject.next(this.categories);
  }

  getCategoryList() {
    return this.categoriesSubject.asObservable();
  }

  initDefaultCategories(): Category {
    const defaultCategories = this.createDefaultCategory();
    this.localStorageService.save(environment.dataTableNames.categories, [
      defaultCategories,
    ]);
    return defaultCategories;
  }

  createDefaultCategory(): Category {
    return {
      id: Date.now().toString(),
      title: environment.defaultCategoryName,
      position: 0,
    };
  }

  defaultCategoryExists(categories: Category[]): boolean {
    return categories.some(
      (category) => category.title === environment.defaultCategoryName
    );
  }

  addCategory(category: Category) {
    const categoriesTemp = [...this.categories, category];

    try {
      this.persistCategories(categoriesTemp);
    } catch (err) {
      console.error(err);
    }
  }

  persistCategories(categories: Category[]) {
    this.localStorageService.save<Category[]>(
      environment.dataTableNames.categories,
      categories
    );
    this.categories = categories;
    this.categoriesSubject.next(this.categories);
  }
}
