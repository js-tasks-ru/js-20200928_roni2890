/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {
  const  tempMap = new Map(Object.entries(obj));
  //у нас есть список методов и список то что надо, если входит в список то оставляем иначе удаляем
  tempMap.forEach((value, key) => {if (!fields.includes(key)){
    tempMap.delete(key);
  }})
  return Object.fromEntries(tempMap);
};
