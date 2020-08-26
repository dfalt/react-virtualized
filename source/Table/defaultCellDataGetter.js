/** @flow */
import type {CellDataGetterParams} from './types';
import getValue from '../utils/getValue';

/**
 * Default accessor for returning a cell value for a given attribute.
 * This function expects to operate on either a vanilla Object or an Immutable Map.
 * You should override the column's cellDataGetter if your data is some other type of object.
 */
export default function defaultCellDataGetter({
  dataKey,
  rowData,
}: CellDataGetterParams) {
  let value;

  if (typeof rowData.get === 'function') {
    value = rowData.get(dataKey);
  } else {
    value = rowData[dataKey];
  }

  if (value === undefined) {
    value = getValue(rowData, dataKey);
  }

  return value;
}
