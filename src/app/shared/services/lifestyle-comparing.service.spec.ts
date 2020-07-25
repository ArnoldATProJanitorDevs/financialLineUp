import {TestBed} from '@angular/core/testing';

import {LifestyleComparingService} from './lifestyle-comparing.service';
import {getExampleLifestyles} from "../../lifestyles/models/lifestyle-example";
import {LifestylesDictionary} from "../../lifestyles/models/lifestylesDictionary.interface";
import {deepCopy} from "../globals/deep-copy";

describe('ComparerHelpFunctionsService', () => {
  let service: LifestyleComparingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LifestyleComparingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('ifLargerThan - should detect if one number is larger than the other number', () => {
    const larger = 9;
    const than = 7;

    const result = service.ifLargerThan(larger, than);
    expect(result).toBeTruthy();

    const result2 = service.ifLargerThan(than, larger);
    expect(result2).toBeFalsy();

  });

  it('ifLargerThan - should detect if one number is larger than the other number if one or both undefied', () => {
    const larger = null;
    const than = 7;

    const larger2 = 9;
    const than2 = null;

    const result = service.ifLargerThan(larger, than);
    expect(result).toBeFalsy();
    const result2 = service.ifLargerThan(larger2, than);
    expect(result2).toBeTruthy();

    const result3 = service.ifLargerThan(than2, larger);
    expect(result3).toBeFalsy();
    const result4 = service.ifLargerThan(than, larger2);
    expect(result4).toBeFalsy();

  });

  it('ifEqual - should detect two equals dictionarys of lifestyles correctly ', () => {
    const exampleLifestyles = getExampleLifestyles();

    const result = service.ifEqual(exampleLifestyles, exampleLifestyles);

    expect(result).toBeTruthy();
  });

  it('ifEqual - should detect for difference in ID of two dictionaries correctly ', () => {
    const exampleLifestyles1 = getExampleLifestyles();
    const exampleLifestyles2: LifestylesDictionary = {};

    Object.values(exampleLifestyles1).forEach(
      ls => {
        exampleLifestyles2[ls.Id] = deepCopy(ls);
        exampleLifestyles2[ls.Id].Id = "differentID"
      }
    );

    const resultDifferentId = service.ifEqual(exampleLifestyles1, exampleLifestyles2);
    expect(resultDifferentId).toBeFalsy();
  });

  it('ifEqual - should detect for difference in Name of two dictionaries correctly ', () => {
    const exampleLifestyles1 = getExampleLifestyles();
    const exampleLifestyles2: LifestylesDictionary = {};

    Object.values(exampleLifestyles1).forEach(
      ls => {
        exampleLifestyles2[ls.Id] = deepCopy(ls);
        exampleLifestyles2[ls.Id].Name = "differentName"
      }
    );

    const resultDifferentName = service.ifEqual(exampleLifestyles1, exampleLifestyles2);
    expect(resultDifferentName).toBeFalsy();
  });

  it('ifEqual - should detect for difference in description of two dictionaries correctly ', () => {
    const exampleLifestyles1 = getExampleLifestyles();
    const exampleLifestyles2: LifestylesDictionary = {};

    Object.values(exampleLifestyles1).forEach(
      ls => {
        exampleLifestyles2[ls.Id] = deepCopy(ls);
        exampleLifestyles2[ls.Id].Description = "notTheSameDescription"
      }
    );

    const resultDifferentDescription = service.ifEqual(exampleLifestyles1, exampleLifestyles2);
    expect(resultDifferentDescription).toBeFalsy();
  });

  it('ifEqual - should detect for difference in TaxRates of two dictionaries correctly ', () => {
    const exampleLifestyles1 = getExampleLifestyles();
    const exampleLifestyles2: LifestylesDictionary = {};

    Object.values(exampleLifestyles1).forEach(
      ls => {
        exampleLifestyles2[ls.Id] = deepCopy(ls);
        exampleLifestyles2[ls.Id].TaxRates = [0, 99, 22]
      }
    );

    const resultDifferentTaxRates = service.ifEqual(exampleLifestyles1, exampleLifestyles2);
    expect(resultDifferentTaxRates).toBeFalsy();
  });

  it('ifEqual - should detect for difference in ItemsLength of two dictionaries correctly ', () => {
    const exampleLifestyles1 = getExampleLifestyles();
    const exampleLifestyles2: LifestylesDictionary = {};

    Object.values(exampleLifestyles1).forEach(
      ls => {
        exampleLifestyles2[ls.Id] = deepCopy(ls);
        exampleLifestyles2[ls.Id].Items = {}
      }
    );

    const resultDifferentItemsLength = service.ifEqual(exampleLifestyles1, exampleLifestyles2);
    expect(resultDifferentItemsLength).toBeFalsy();
  });


  it('ifEqual - should detect for difference in ItemsPorperty of two dictionaries correctly ', () => {
    const exampleLifestyles1 = getExampleLifestyles();
    const exampleLifestyles2: LifestylesDictionary = {};

    Object.values(exampleLifestyles1).forEach(
      ls => {
        exampleLifestyles2[ls.Id] = deepCopy(ls);
        Object.values(exampleLifestyles2[ls.Id].Items).map(item => item.Comment = "differenComment")
      }
    );

    const resultDifferentItemsProperty = service.ifEqual(exampleLifestyles1, exampleLifestyles2);
    expect(resultDifferentItemsProperty).toBeFalsy();
  });


  it('checkIfLifestylesAreEqual - should detect if two lifestyles are the same and not', () => {
    const exampleLifestyles1 = Object.values(getExampleLifestyles());

    const resultLifestylesCompareToTrue = service.checkIfLifestylesAreEqual(exampleLifestyles1[0], exampleLifestyles1[0]);
    expect(resultLifestylesCompareToTrue).toBeTruthy();

    const resultLifestylesCompareToFalse = service.checkIfLifestylesAreEqual(exampleLifestyles1[0], exampleLifestyles1[1]);
    expect(resultLifestylesCompareToFalse).toBeFalsy();
  });

  it('checkIfLifestylesAreEqual - should detect if two lifestyles have different ID', () => {
    const exampleLifestyle = Object.values(getExampleLifestyles())[0];
    const differentLifestyle = deepCopy(exampleLifestyle);
    differentLifestyle.Id = 'differentID';

    const result = service.checkIfLifestylesAreEqual(exampleLifestyle, differentLifestyle);
    expect(result).toBeFalsy();
  });

  it('checkIfLifestylesAreEqual - should detect if two lifestyles have different Names', () => {
    const exampleLifestyle = Object.values(getExampleLifestyles())[0];
    const differentLifestyle = deepCopy(exampleLifestyle);
    differentLifestyle.Name = 'differentName';

    const result = service.checkIfLifestylesAreEqual(exampleLifestyle, differentLifestyle);
    expect(result).toBeFalsy();
  });

  it('checkIfLifestylesAreEqual - should detect if two lifestyles have different Description', () => {
    const exampleLifestyle = Object.values(getExampleLifestyles())[0];
    const differentLifestyle = deepCopy(exampleLifestyle);
    differentLifestyle.Description = 'differentDescription';

    const result = service.checkIfLifestylesAreEqual(exampleLifestyle, differentLifestyle);
    expect(result).toBeFalsy();
  });

  it('checkIfLifestylesAreEqual - should detect if two lifestyles have different TaxRates', () => {
    const exampleLifestyle = Object.values(getExampleLifestyles())[0];
    const differentLifestyle = deepCopy(exampleLifestyle);
    differentLifestyle.TaxRates = [0, 0, 0, 12, 31];

    const result = service.checkIfLifestylesAreEqual(exampleLifestyle, differentLifestyle);
    expect(result).toBeFalsy();
  });

  it('checkIfLifestylesAreEqual - should detect if two lifestyles have different TaxRates (null)', () => {
    const exampleLifestyle = Object.values(getExampleLifestyles())[0];
    const differentLifestyle = deepCopy(exampleLifestyle);
    differentLifestyle.TaxRates = null;

    const result = service.checkIfLifestylesAreEqual(exampleLifestyle, differentLifestyle);
    expect(result).toBeFalsy();
  });

  it('checkIfLifestylesAreEqual - should detect if two lifestyles have different ItemLength (null)', () => {
    const exampleLifestyle = Object.values(getExampleLifestyles())[0];
    const differentLifestyle = deepCopy(exampleLifestyle);
    differentLifestyle.Items = null;

    const result = service.checkIfLifestylesAreEqual(exampleLifestyle, differentLifestyle);
    expect(result).toBeFalsy();
  });

  it('checkIfLifestylesAreEqual - should detect if two lifestyles have different ItemLength - empty dictionary', () => {
    const exampleLifestyle = Object.values(getExampleLifestyles())[0];
    const differentLifestyle = deepCopy(exampleLifestyle);
    differentLifestyle.Items = {};

    const result = service.checkIfLifestylesAreEqual(exampleLifestyle, differentLifestyle);
    expect(result).toBeFalsy();
  });


  it('checkIfLifestylesAreEqual - should detect if two lifestyles have different Items', () => {
    const exampleLifestyle = Object.values(getExampleLifestyles())[0];
    const differentLifestyle = deepCopy(exampleLifestyle);
    Object.values(differentLifestyle.Items).map(item => item.Cost = 9);

    let result = service.checkIfLifestylesAreEqual(exampleLifestyle, differentLifestyle);
    expect(result).toBeFalsy();

    Object.values(differentLifestyle.Items).map(item => item.Index = item.Cost + 1);

    result = service.checkIfLifestylesAreEqual(exampleLifestyle, differentLifestyle);
    expect(result).toBeFalsy();

    Object.values(differentLifestyle.Items).map(item => item.Id = "differentID");

    result = service.checkIfLifestylesAreEqual(exampleLifestyle, differentLifestyle);
    expect(result).toBeFalsy();

    Object.values(differentLifestyle.Items).map(item => item.Category = {name: 'housing', icon: 'house', group: 0});

    result = service.checkIfLifestylesAreEqual(exampleLifestyle, differentLifestyle);
    expect(result).toBeFalsy();

    Object.values(differentLifestyle.Items).map(item => item.Comment = 'differentComment');

    result = service.checkIfLifestylesAreEqual(exampleLifestyle, differentLifestyle);
    expect(result).toBeFalsy();

    Object.values(differentLifestyle.Items).map(item => item.LifestyleId = 'differentLifestyleID');

    result = service.checkIfLifestylesAreEqual(exampleLifestyle, differentLifestyle);
    expect(result).toBeFalsy();
  });

  it('compareStringsForEquality - detect false or true for correct input', () => {
    const str1 = "string1";
    const str2 = "string2";

    let resultTrue = service.compareStringsForEquality(str1, str1);
    expect(resultTrue).toBeTruthy();

    resultTrue = service.compareStringsForEquality(str2, str2);
    expect(resultTrue).toBeTruthy();

    let resultfalse = service.compareStringsForEquality(str1, str2);
    expect(resultfalse).toBeFalsy();

    resultfalse = service.compareStringsForEquality(str1, str2);
    expect(resultfalse).toBeFalsy();

  });

  it('compareStringsForEquality - behave desired for invalid input', () => {
    const str = "string1";
    const strUndefined = undefined;
    const strNull = null;

    let resultfalse = service.compareStringsForEquality(str, strNull);
    expect(resultfalse).toBeFalsy();
    resultfalse = service.compareStringsForEquality(str, strUndefined);
    expect(resultfalse).toBeFalsy();
    resultfalse = service.compareStringsForEquality(strUndefined, strNull);
    expect(resultfalse).toBeFalsy();

  });

  it('compareNumberArrayForEquality - should detect correctly by providing correct input', () => {
    const array1 = [12, 13, 55];
    const array2 = [55, 13, 12];

    const result = service.compareNumberArrayForEquality(array1, array1);
    expect(result).toBeTruthy();

    const result2 = service.compareNumberArrayForEquality(array1, array2);
    expect(result2).toBeFalsy();

    const result3 = service.compareNumberArrayForEquality(array2, array1);
    expect(result3).toBeFalsy();
  });


  it('compareNumberArrayForEquality - should work correctly by providing false input (null / undefinded)', () => {
    const array1 = [12, 13, 55];
    const arrayNull = null;
    const arrayUndefined = undefined;

    const result = service.compareNumberArrayForEquality(array1, array1);
    expect(result).toBeTruthy();

    const result2 = service.compareNumberArrayForEquality(array1, arrayNull);
    expect(result2).toBeFalsy();

    const result3 = service.compareNumberArrayForEquality(array1, arrayUndefined);
    expect(result3).toBeFalsy();

  });

  it('compareItemDictionaryForEquality - should detect correctly if input provided correctly', () => {

    const ItemsDictionaryArray = Object.values(getExampleLifestyles()).map(ls => ls.Items);

    const result = service.compareItemDictionaryForEquality(ItemsDictionaryArray[0], ItemsDictionaryArray[1]);
    expect(result).toBeFalsy();

    const result2 = service.compareItemDictionaryForEquality(ItemsDictionaryArray[0], ItemsDictionaryArray[0]);
    expect(result2).toBeTruthy();

  });

  it('compareItemDictionaryForEquality - should detect correctly if items differ in Category', () => {

    const ItemsDictionaryArray = Object.values(getExampleLifestyles()).map(ls => ls.Items);

    let differentItemDictionary = {};
    differentItemDictionary = Object.values(ItemsDictionaryArray).map(itemDic => Object.values(itemDic).map(item => item.Category = {
      icon: 'house',
      name: 'housing',
      group: 0
    }));

    const result = service.compareItemDictionaryForEquality(ItemsDictionaryArray[0], differentItemDictionary[0]);
    expect(result).toBeFalsy();

  });

  it('compareItemDictionaryForEquality - should detect correctly if items differ in cost', () => {

    const ItemsDictionaryArray = Object.values(getExampleLifestyles()).map(ls => ls.Items);

    let differentItemDictionary = {};
    differentItemDictionary = Object.values(ItemsDictionaryArray).map(itemDic => Object.values(itemDic).map(item => item.Cost = 44));

    const result = service.compareItemDictionaryForEquality(ItemsDictionaryArray[0], differentItemDictionary[0]);
    expect(result).toBeFalsy();

  });

  it('compareItemDictionaryForEquality - should detect correctly if items differ in comment', () => {

    const ItemsDictionaryArray = Object.values(getExampleLifestyles()).map(ls => ls.Items);

    let differentItemDictionary = {};
    differentItemDictionary = Object.values(ItemsDictionaryArray).map(itemDic => Object.values(itemDic).map(item => item.Comment = 'diffComment'));

    const result = service.compareItemDictionaryForEquality(ItemsDictionaryArray[0], differentItemDictionary[0]);
    expect(result).toBeFalsy();

  });

  it('compareItemDictionaryForEquality - should detect correctly if items differ in index', () => {

    const ItemsDictionaryArray = Object.values(getExampleLifestyles()).map(ls => ls.Items);

    let differentItemDictionary = {};
    differentItemDictionary = Object.values(ItemsDictionaryArray).map(itemDic => Object.values(itemDic).map(item => item.Index = 44));

    const result = service.compareItemDictionaryForEquality(ItemsDictionaryArray[0], differentItemDictionary[0]);
    expect(result).toBeFalsy();

  });

  it('compareItemDictionaryForEquality - should detect correctly if items entry are null', () => {

    const ItemsDictionaryArray = Object.values(getExampleLifestyles()).map(ls => ls.Items);

    let differentItemDictionary = {};
    differentItemDictionary = Object.values(ItemsDictionaryArray).map(itemDic => Object.values(itemDic).map(item => item = null));

    const result = service.compareItemDictionaryForEquality(ItemsDictionaryArray[0], differentItemDictionary[0]);
    expect(result).toBeFalsy();

  });

  it('compareItemDictionaryForEquality - should detect correctly if dictionary is null', () => {

    const ItemsDictionaryArray = Object.values(getExampleLifestyles()).map(ls => ls.Items);

    let differentItemDictionary = {};
    differentItemDictionary = Object.values(ItemsDictionaryArray).map(itemDic => Object.values(itemDic).map(item => item = null));

    const result = service.compareItemDictionaryForEquality(ItemsDictionaryArray[0], null);
    expect(result).toBeFalsy();

    const result2 = service.compareItemDictionaryForEquality(null, differentItemDictionary[0]);
    expect(result2).toBeFalsy();

  });



});
