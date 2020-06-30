export function convertDictionaryToArray(dictionary: any): any[] {

  let array = [];

  for (let key in dictionary) {
    array.push(dictionary[key]);
  }

  return array;
}
