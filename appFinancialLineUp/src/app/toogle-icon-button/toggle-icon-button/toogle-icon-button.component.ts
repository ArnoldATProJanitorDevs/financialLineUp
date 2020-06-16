import {Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {FormArray, FormControl, FormGroup} from '@angular/forms';

export interface Category {
  name: string;
  icon: string;
}

@Component({
  selector: 'app-toggle-icon-button',
  templateUrl: './toogle-icon-button.component.html',
  styles: [`h1 {
      font-family: Lato;
  }`],
  animations: [
    trigger('categoryIcon', [
      transition('* => *', [
        style({
          transform: `scale(1.5)`,
          opacity: 0
        }),
        animate('.2s 0s ease-out'),
      ])
    ])
  ]
})
export class ToogleIconButtonComponent  {


  @Input() category: Category;

  @Output()
  toggleCategory = new EventEmitter<Category>();

  onClick() {
    this.toggleCategory.emit(this.category);
  }

}
