import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LocalStorageService {
  constructor() {}

  save<T>(key: string, data: T): void {
    try {
      // Try to store the item in localStorage
      localStorage.setItem(key, JSON.stringify(data));
    } catch (err) {
      throw err;
    }
  }

  add<T>(key: string, data: T): void {
    try {
      // Try to store the item in localStorage
      const currentArrayState = this.get<T[]>(key) || [];
      localStorage.setItem(key, JSON.stringify(currentArrayState.concat(data)));
    } catch (err) {
      throw err;
    }
  }

  get<T>(key: string): T | null {
    try {
      const storedData = localStorage.getItem(key);

      if (storedData) {
        try {
          // Attempt to parse the stored data
          return JSON.parse(storedData) as T;
        } catch (err) {
          // Handle parsing errors (malformed JSON)
          throw err;
        }
      }

      return null; // Return null if data doesn't exist
    } catch (err) {
      throw err;
    }
  }
}
