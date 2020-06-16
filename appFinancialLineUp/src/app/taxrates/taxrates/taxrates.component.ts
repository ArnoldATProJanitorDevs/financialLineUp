import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Item} from "../../item/models/item.interface";

@Component({
  selector: 'app-taxrates',
  templateUrl: './taxrates.component.html',
  styleUrls: ['./taxrates.component.scss']
})
export class TaxratesComponent implements OnInit {

  @Input() Taxrates: number[];

  @Output() TaxratesChanged: EventEmitter<number[]> = new EventEmitter<number[]>();

  constructor() {
  }

  ngOnInit(): void {
  }

  updateTaxrate(i: number, value: number) {
    this.Taxrates[i] = value;
    this.publishChanges(this.Taxrates);
  }

  HandleAddTaxrateButton() {
    this.addTaxrate();
  }

  HandleRemoveTaxrateButton(index: number) {
    this.removeTaxrate(index);
  }

  addTaxrate() {
    this.Taxrates.push(0);
    this.publishChanges(this.Taxrates);
  }

  removeTaxrate(index: number) {
    this.Taxrates.splice(index, 1);
    this.publishChanges(this.Taxrates);
  }

  publishChanges(taxrates: number[]) {
    this.TaxratesChanged.emit(taxrates);
  }
}
