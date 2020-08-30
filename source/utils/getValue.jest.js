import getValue from './getValue';

describe('getValue', () => {
  const obj = {
    id: 1,
    name: 'Object',
    explicitNull: null,
    'field with spaces': 'Spaces',
    nested: {object: {prop: 'Nested'}},
    'nested field': {'with spaces': 'Nested Spaces'},
    ĦĔĽĻŎ: {〱〱〱〱: {जावास्क्रिप्ट: 'Nested Unicode Characters'}},
  };

  it('should return undefined for undefined or null arguments', () => {
    expect(getValue(obj, undefined)).toEqual(undefined);
    expect(getValue(obj, null)).toEqual(undefined);
    expect(getValue(undefined, 'id')).toEqual(undefined);
    expect(getValue(undefined, 'nested.object')).toEqual(undefined);
    expect(getValue(undefined, null)).toEqual(undefined);
    expect(getValue(undefined, undefined)).toEqual(undefined);
    expect(getValue(null, null)).toEqual(undefined);
  });

  it('should return undefined for missing field value', () => {
    expect(getValue(obj, 'non-existent')).toEqual(undefined);
  });

  it('should return non-nested field value', () => {
    expect(getValue(obj, 'id')).toEqual(1);
    expect(getValue(obj, 'name')).toEqual('Object');
    expect(getValue(obj, 'explicitNull')).toEqual(null);
    expect(getValue(obj, 'field with spaces')).toEqual('Spaces');
  });

  it('should return nested field value', () => {
    expect(getValue(obj, 'nested.object.prop')).toEqual('Nested');
    expect(getValue(obj, 'nested["object"].prop')).toEqual('Nested');
    expect(getValue(obj, 'nested["object"]["prop"]')).toEqual('Nested');
    expect(getValue(obj, 'nested field["with spaces"]')).toEqual(
      'Nested Spaces',
    );
    expect(getValue(obj, 'ĦĔĽĻŎ.〱〱〱〱.जावास्क्रिप्ट')).toEqual(
      'Nested Unicode Characters',
    );
    expect(getValue(obj, "ĦĔĽĻŎ.〱〱〱〱['जावास्क्रिप्ट']")).toEqual(
      'Nested Unicode Characters',
    );
    expect(getValue(obj, "ĦĔĽĻŎ['〱〱〱〱']['जावास्क्रिप्ट']")).toEqual(
      'Nested Unicode Characters',
    );
  });
});
