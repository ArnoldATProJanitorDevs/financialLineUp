import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TaxratesComponent} from "./taxrates/taxrates.component";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [TaxratesComponent],
  exports: [TaxratesComponent],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class TaxratesModule {
}
