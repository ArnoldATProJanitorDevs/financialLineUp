import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppComponentPartialState} from "./+state/app-component.reducer";
import {loadAppComponent} from "./+state/app-component.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Financial Line Up';
  subTitle = 'Plan your financial Lifestyle';


  constructor(private store: Store<AppComponentPartialState>) {
  }


  ngOnInit(){
    this.store.dispatch(loadAppComponent());
  }
}
