import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LifestyleComponent } from './lifestyle/lifestyle.component';
import {SharedModule} from "../shared/shared.module";
import {FormsModule} from "@angular/forms";
import {AppModule} from "../app.module";
import {ItemsModule} from "../items/items.module";
import {SummaryModule} from "../summary/summary.module";
import {TaxratesModule} from "../taxrates/taxrates.module";

@NgModule({
  declarations: [LifestyleComponent],
  exports: [
    LifestyleComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ItemsModule,
    SummaryModule,
    TaxratesModule,
  ]
})
export class LifestyleModule { }
