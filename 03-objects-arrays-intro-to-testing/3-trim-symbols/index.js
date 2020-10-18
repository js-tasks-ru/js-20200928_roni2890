/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  switch (size) {
    case 0:
      return '';
    case undefined:
      return string;
  }
  let  returnString = '';
  let currentCountChar = 0;
  for (let index = 0; index < string.length; index++) {
    ++currentCountChar;
    if (string[index] !== string[index - 1]){
      currentCountChar = 1;
    }
    if (currentCountChar <= size){
      returnString += string[index];
    }
  }
  return returnString;
}
