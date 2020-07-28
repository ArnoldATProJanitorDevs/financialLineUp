import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToogleIconButtonComponent } from './toogle-icon-button.component';
import {SharedModule} from "../../shared/shared.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserDynamicTestingModule} from "@angular/platform-browser-dynamic/testing";
import {ExportDialogComponent} from "../../shared/modalDialog/export-dialog.component";

describe('ToogleIconButtonComponent', () => {
  let component: ToogleIconButtonComponent;
  let fixture: ComponentFixture<ToogleIconButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToogleIconButtonComponent, ExportDialogComponent ],
      imports: [SharedModule, BrowserAnimationsModule]
    }).overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [ExportDialogComponent],
        }
      }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToogleIconButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
