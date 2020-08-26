/**
 * Takes in an Object or Map along with a dot formatted path and looks to find
 * the value associated with the path in the provided object. This works for both
 * nested and non-nested properties.
 *
 * @param obj Object or Map value source
 * @param path String in dot notation, used to look for value in obj
 * @returns {any} value located at the dot natation path for the given obj or undefined if nothing is found;
 * will return undefined for any missing argumnt
 */
export default function getValue(obj: Object | Map, path: String) {
  let value = undefined;
  const missingArgument =
    obj === undefined || obj === null || path === undefined || path === null;

  if (!missingArgument) {
    const fieldNames = path.split('.');
    let currentReference = obj;
    for (let i = 0; i < fieldNames.length; i++) {
      let currentFieldName = fieldNames[i];
      if (typeof currentReference.get === 'function') {
        currentReference = currentReference.get(currentFieldName);
      } else {
        currentReference = currentReference[currentFieldName];
      }

      if (i + 1 === fieldNames.length) {
        // This is the value we were looking for
        value = currentReference;
      }
    }
  }

  return value;
}
