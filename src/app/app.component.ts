import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppComponentPartialState} from "./+state/app-component.reducer";
import {loadAppComponent} from "./+state/app-component.actions";
import {environment} from "../environments/environment.prod";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Financial Line Up';
  subTitle = 'Financial Lifestyle Planner';
  environment = environment;

  constructor(private store: Store<AppComponentPartialState>) {
  }

  ngOnInit() {
    this.store.dispatch(loadAppComponent());
  }
}
