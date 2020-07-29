import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TaxratesComponent} from './taxrates.component';
import {SharedModule} from '../../shared/shared.module';
import {getExampleLifestyles} from '../../lifestyles/models/lifestyle-example';
import {LifestylesDictionary} from '../../lifestyles/models/lifestylesDictionary.interface';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import * as fromLifestyles from '../../lifestyles/+state/lifestyles.reducer';
import {MemoizedSelectorWithProps} from '@ngrx/store';
import {Lifestyle} from '../../lifestyle/models/lifestyle.interface';
import {LifestylesFacade} from '../../lifestyles/+state/lifestyles.facade';
import * as fromLifestylesSelectors from '../../lifestyles/+state/lifestyles.selectors';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import * as LifestyleActions from '../../lifestyles/+state/lifestyles.actions';
import {deepCopy} from '../../shared/globals/deep-copy';
import {BrowserDynamicTestingModule} from "@angular/platform-browser-dynamic/testing";
import {ExportDialogComponent} from "../../shared/modalDialog/export-dialog.component";

describe('TaxratesComponent', () => {
  let component: TaxratesComponent;
  let fixture: ComponentFixture<TaxratesComponent>;
  let dispatchSpy;


  let newId = 0;

  const testLifeStyles = Object.values(getExampleLifestyles()).map(ls => {
    ls.Id = newId++;
    Object.values(ls.Items).map(item => item.LifestyleId = newId);

    return ls;
  });

  const testLifestyleDictionary: LifestylesDictionary = {};
  testLifeStyles.forEach(ls => {
    testLifestyleDictionary[ls.Id] = ls;
  });

  let mockStore: MockStore<fromLifestyles.State>;
  let lifestyleSelectorById: MemoizedSelectorWithProps<fromLifestyles.State, {}, Lifestyle>;

  const initialLifestyleState = {
    Lifestyles: testLifestyleDictionary,
  } as fromLifestyles.State;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaxratesComponent],
      imports: [
        SharedModule,
        BrowserAnimationsModule,
      ],
      providers: [LifestylesFacade, provideMockStore({initialState: initialLifestyleState})]
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(TaxratesComponent);
    component = fixture.componentInstance;

    lifestyleSelectorById = mockStore.overrideSelector(
      fromLifestylesSelectors.getLifestyleById,
      Object.values(initialLifestyleState.Lifestyles)[0]
    );

    lifestyleSelectorById.setResult(Object.values(initialLifestyleState.Lifestyles)[0]);
    mockStore.refreshState();
    fixture.detectChanges();

    component.LifestyleId = Object.values(getExampleLifestyles())[0].Id;
    (component as any).setUpSubscriptions();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('setUpSubscriptions - should have the right taxRates', () => {
    expect(component.TaxRates).toEqual([42]);
  });

  it('updateTaxrate - should call updatetaxRates once and with updated value', () => {
    dispatchSpy = spyOn(mockStore, 'dispatch');

    const indexofTaxToUpdate = 0;
    const newTaxRate = 44;

    component.updateTaxrate(indexofTaxToUpdate, newTaxRate);

    expect(component.TaxRates[indexofTaxToUpdate]).toBe(newTaxRate);
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(
      LifestyleActions.updateLifestyleTaxes({LifestyleId: component.LifestyleId, Taxes: component.TaxRates})
    );
  });

  it('addTaxrate - should have the right taxRates', () => {
    const originTaxRates = deepCopy(component.TaxRates);

    (component as any).addTaxrate();


    expect(component.TaxRates.length).toBe(originTaxRates.length + 1);
    expect(component.TaxRates[component.TaxRates.length - 1]).toBe(0);
  });

  it('deleteTaxrate - should delete the taxRate with correctly provided Index', () => {
    dispatchSpy = spyOn(mockStore, 'dispatch');

    const originTaxRates = deepCopy(component.TaxRates);

    (component as any).deleteTaxrate(0);

    expect(component.TaxRates.length).toBe(originTaxRates.length - 1);
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
  });

  it('deleteTaxrate - should delete the taxRate with incorrectly provided Index', () => {
    dispatchSpy = spyOn(mockStore, 'dispatch');

    const originTaxRates = deepCopy(component.TaxRates);

    (component as any).deleteTaxrate(44);
    (component as any).deleteTaxrate(-44);

    expect(dispatchSpy).toHaveBeenCalledTimes(0);
  });

});
