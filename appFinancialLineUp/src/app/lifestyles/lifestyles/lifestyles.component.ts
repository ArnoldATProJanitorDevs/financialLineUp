import {Component, OnInit} from '@angular/core';
import {LifestylesFacade} from "../+state/lifestyles.facade";
import {Observable} from "rxjs";
import {LifestylesDictionary} from "../+state/lifestyles.effects";

@Component({
  selector: 'app-lifestyles',
  templateUrl: './lifestyles.component.html',
  styleUrls: ['./lifestyles.component.scss']
})
export class LifestylesComponent implements OnInit {

  Lifestyles$: Observable<LifestylesDictionary>;

  constructor(private lifestyleFacade: LifestylesFacade) { }

  ngOnInit(): void {
    this.Lifestyles$ = this.lifestyleFacade.getLifeStylesAll();
  }




}

