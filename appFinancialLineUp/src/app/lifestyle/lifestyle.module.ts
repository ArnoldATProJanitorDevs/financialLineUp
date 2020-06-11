import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LifestyleComponent } from './lifestyle/lifestyle.component';
import {MatTableModule} from "@angular/material/table";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [LifestyleComponent],
  exports: [
    LifestyleComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class LifestyleModule { }
