import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItemsComponent} from "./items/items.component";
import {ToggleIconButtonModule} from "../toogle-icon-button/toggle-icon-button.module";
import {SharedModule} from "../shared/shared.module";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [ItemsComponent],
  exports: [ItemsComponent],
  imports: [
    CommonModule,
    ToggleIconButtonModule,
    SharedModule,
    FormsModule
  ]
})
export class ItemsModule{

}
