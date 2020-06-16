import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ToogleIconButtonComponent} from "./toggle-icon-button/toogle-icon-button.component";
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [ToogleIconButtonComponent],
  exports: [ToogleIconButtonComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ToggleIconButtonModule { }
