import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppComponentPartialState} from "./+state/app-component.reducer";
import {loadAppComponent} from "./+state/app-component.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Financial Line Up';
  subTitle = 'Financial Lifestyle Planner';

  majorVersion: number = 0;
  minorVersion: number = 911;
  devState: string = 'beta';


  constructor(private store: Store<AppComponentPartialState>) {
  }


  getVersionString(){
    return this.majorVersion + '.' + this.minorVersion + '-' + this.devState;
  }

  ngOnInit() {
    this.store.dispatch(loadAppComponent());
  }
}
