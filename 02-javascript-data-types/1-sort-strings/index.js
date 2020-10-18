/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  return arr.slice().sort(function(a, b) {
    //localeCompare возможные варианты -1 0 1
    const resultCompare = a.normalize().localeCompare(b.normalize(),['ru', 'en-US'], {caseFirst: 'upper'});
    if (param === 'asc')
      return resultCompare
    else
      return resultCompare * -1; //инвертируем
   });
}
