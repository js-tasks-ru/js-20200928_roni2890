/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {
  const ReturnObj = {};
  //у нас есть список методов и список то что надо, если входит в список то оставляем иначе удаляем
  for (const [key, value] of Object.entries(obj)) {
    if (!fields.includes(key)){
      ReturnObj[key] = value;
  }}
  return ReturnObj;
};
