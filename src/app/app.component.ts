import { Component, OnInit } from "@angular/core";

import { InitService } from "./services/init.service";

@Component({
  selector: "app-root",
  template: `<router-outlet></router-outlet>`,
  styles: [],
})
export class AppComponent implements OnInit {
  title = "todo-angular";

  constructor(private initService: InitService) {}

  ngOnInit(): void {
    this.initService.init();
  }
}
