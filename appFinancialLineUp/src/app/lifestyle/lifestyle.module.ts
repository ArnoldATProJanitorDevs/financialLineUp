import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LifestyleComponent } from './lifestyle/lifestyle.component';
import {SharedModule} from "../shared/shared.module";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [LifestyleComponent],
  exports: [
    LifestyleComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,

  ]
})
export class LifestyleModule { }
