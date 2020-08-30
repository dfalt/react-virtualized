const propertyNameCaptureRegex = new RegExp(/([^\.\[\]\n\r]+)/, 'g');

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
    const propertyNames = getPropertyNames(path);

    let currentReference = obj;
    for (let i = 0; i < propertyNames.length; i++) {
      let currentPropertyName = propertyNames[i];
      if (typeof currentReference.get === 'function') {
        currentReference = currentReference.get(currentPropertyName);
      } else {
        currentReference = currentReference[currentPropertyName];
      }

      if (i + 1 === propertyNames.length) {
        // This is the value we were looking for
        value = currentReference;
      }
    }
  }

  return value;
}

function getPropertyNames(path: String) {
  const propertyNames = path.match(propertyNameCaptureRegex);

  if (propertyNames) {
    // Iterate array in reverse so that we can splice updated prop names as needed
    for (let i = propertyNames.length - 1; i >= 0; i--) {
      const currentPropName = propertyNames[i];
      if (
        startsWithQuotation(currentPropName) &&
        endsWithQuotation(currentPropName)
      ) {
        // Strip property of wrapping quotation marks captured by regex (likely part of square bracket notation)
        propertyNames.splice(
          i,
          1,
          currentPropName.substr(1, currentPropName.length - 2),
        );
      }
    }
  }

  return propertyNames;
}

function startsWithQuotation(string: String) {
  if (string) {
    const firstChar = string.charAt(0);
    return firstChar === '"' || firstChar === "'";
  } else {
    return false;
  }
}

function endsWithQuotation(string: String) {
  if (string) {
    const lastChar = string.charAt(string.length - 1);
    return lastChar === '"' || lastChar === "'";
  } else {
    return false;
  }
}
