import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SummaryComponent} from "./summary/summary.component";
import {MatCardModule} from "@angular/material/card";
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [SummaryComponent],
  exports: [SummaryComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class SummaryModule { }
