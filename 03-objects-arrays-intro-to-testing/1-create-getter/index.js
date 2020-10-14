/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
//разобрать на составляющие
  const parsedPath = path.split('.');
//в цикле найти нужное свойство
  return function(obj) {
    let innerObj = obj;
    for (const property of parsedPath) {
      if (innerObj === undefined){//А можно ли так писать? if (!innerObj) !{}=false !NaN=true или лучше явно сравнивать
        break;
      }
      innerObj = innerObj[property];
    }
    return innerObj;
  };
}
