/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  const sorted = arr.slice().sort(function(a, b) {
    return a.normalize().localeCompare(b.normalize(),['ru', 'en-US'], {caseFirst: 'upper'});
   });
  if (param === 'desc')
    sorted.reverse();
  return sorted;
}