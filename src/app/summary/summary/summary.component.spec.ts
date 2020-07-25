import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SummaryComponent} from './summary.component';
import {SharedModule} from "../../shared/shared.module";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import * as fromLifestyles from "../../lifestyles/+state/lifestyles.reducer";
import {MemoizedSelector, MemoizedSelectorWithProps} from "@ngrx/store";
import {ItemDictionary} from "../../items/models/itemDictionary.interface";
import {getExampleLifestyles} from "../../lifestyles/models/lifestyle-example";
import * as fromLifestylesSelectors from "../../lifestyles/+state/lifestyles.selectors";
import {LifestylesDictionary} from "../../lifestyles/models/lifestylesDictionary.interface";
import {LifestylesFacade} from "../../lifestyles/+state/lifestyles.facade";
import {Lifestyle} from "../../lifestyle/models/lifestyle.interface";
import {IncomeNeeds} from "../models/incomeNeeds.interface";

describe('SummaryComponent', () => {
  let component: SummaryComponent;
  let fixture: ComponentFixture<SummaryComponent>;

  let newId = 0;

  const testLifeStyles = Object.values(getExampleLifestyles()).map(ls => {
    ls.Id = newId++
    Object.values(ls.Items).map(item => item.LifestyleId = newId);

    return ls;
  });

  const testLifestyleDictionary: LifestylesDictionary = {};
  testLifeStyles.forEach(ls => {
    testLifestyleDictionary[ls.Id] = ls;
  })


  let mockStore: MockStore<fromLifestyles.State>;
  let lifestyleSelector: MemoizedSelector<fromLifestyles.State, LifestylesDictionary>;
  let lifestyleSelectorById: MemoizedSelectorWithProps<fromLifestyles.State, { id }, Lifestyle>;
  let lifestyleItemSelector: MemoizedSelectorWithProps<fromLifestyles.State, {}, ItemDictionary>;

  let initialLifestyleState = {
    Lifestyles: testLifestyleDictionary,
  } as fromLifestyles.State;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SummaryComponent],
      imports: [
        SharedModule
      ],
      providers: [LifestylesFacade, provideMockStore({initialState: initialLifestyleState})]
    })
      .compileComponents();

    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(SummaryComponent);
    component = fixture.componentInstance;


    lifestyleSelector = mockStore.overrideSelector(
      fromLifestylesSelectors.getAllLifestyles,
      initialLifestyleState.Lifestyles
    );

    lifestyleSelectorById = mockStore.overrideSelector(
      fromLifestylesSelectors.getLifestyleById,
      Object.values(initialLifestyleState.Lifestyles)[0]
    );

    lifestyleItemSelector = mockStore.overrideSelector(
      fromLifestylesSelectors.getAllItemsOfLifestyleById,
      {}
    );

    lifestyleSelector.setResult(initialLifestyleState.Lifestyles)
    lifestyleSelectorById.setResult(Object.values(initialLifestyleState.Lifestyles)[0]);
    mockStore.refreshState();
    fixture.detectChanges();

    component.LifestyleId = Object.values(getExampleLifestyles())[0].Id;
    component.setUpSubscriptions();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('setUpSubscriptions - should calculate IncomeNeeds correctly', () => {

    const testItemDictionary = {
      ['f9a42ca8-0ab2-4533-ace1-e8a27f53427c']: {
        LifestyleId: 1,
          Id: 'f9a42ca8-0ab2-4533-ace1-e8a27f53427c',
          Cost: 20,
          Category: { name: 'housing', icon: 'house' },
        Comment: 'Re1',
          Index: 0
      },
      ['25332171-c520-4dcd-806c-ba11ae2f1e8e']: {
        LifestyleId: 1,
          Id: '25332171-c520-4dcd-806c-ba11ae2f1e8e',
          Cost: 20,
          Category: { name: 'insurance', icon: 'security' },
        Comment: 'In1',
          Index: 1
      }};

    const expectedResults: IncomeNeeds = {
      BeforeTaxes: { Daily: 1.3333333333333333, Weekly: 10, Monthly: 40, Yearly: 480 },
      AfterTaxes: [ { Daily: 2.299, Weekly: 17.2425, Monthly: 68.97, Yearly: 827.64 } ]
    }

    lifestyleItemSelector.setResult(testItemDictionary);
    mockStore.refreshState();
    fixture.detectChanges();

    expect(component.IncomeNeeds).toEqual(expectedResults);

  });

});
