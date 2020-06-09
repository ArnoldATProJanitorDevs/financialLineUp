import { Component, OnInit } from '@angular/core';
import {LifestylesFacade} from "../+state/lifestyles.facade";
import {Observable} from "rxjs";

@Component({
  selector: 'app-lifestyles',
  templateUrl: './lifestyles.component.html',
  styleUrls: ['./lifestyles.component.scss']
})
export class LifestylesComponent implements OnInit {

  Lifestyles$: Observable<any>;

  constructor(private lifestyleFacade: LifestylesFacade) { }

  ngOnInit(): void {
    this.Lifestyles$ = this.lifestyleFacade.getLifeStylesAll();
  }

}
