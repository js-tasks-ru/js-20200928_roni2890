/**
 * omit - creates an object composed of enumerable property fields
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to omit
 * @returns {object} - returns the new object
 */
export const omit = (obj, ...fields) => {
  const  tempMap = new Map(Object.entries(obj));
  tempMap.forEach((value, key) => {if (fields.includes(key)){
    tempMap.delete(key);
  }})
  return Object.fromEntries(tempMap);
};
