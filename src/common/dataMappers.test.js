import _ from 'lodash';
import * as mappers from './dataMappers';
import { convertKeysFactory } from './dataMappers';

describe('sanitize', () => {
  it('should return unchanged object if nothing is passed as fields', () => {
    const testObj = {
      a: 1,
      b2: '2b',
      c: true,
    };

    const sanitized = mappers.sanitize(testObj);

    expect(sanitized).toMatchObject(testObj);
  });

  it('should return unchanged if fields are not array of strings', () => {
    const testObj = {
      a: 1,
      b2: '2b',
      c: true,
    };

    const sanitized1 = mappers.sanitize(testObj, 2);
    const sanitized2 = mappers.sanitize(testObj, {});
    const sanitized3 = mappers.sanitize(testObj, true);

    expect(sanitized1).toMatchObject(testObj);
    expect(sanitized2).toMatchObject(testObj);
    expect(sanitized3).toMatchObject(testObj);
  });

  it('should return filtered object if fields are valid', () => {
    const testObj = {
      a: 1,
      b2: '2b',
      c: true,
    };

    const sanitized1 = mappers.sanitize(testObj, []);
    const sanitized2 = mappers.sanitize(testObj, [1, true]);
    const sanitized3 = mappers.sanitize(testObj, ['a', 'b']);
    const sanitized4 = mappers.sanitize(testObj, ['a', 'c']);
    const sanitized5 = mappers.sanitize(testObj, 'b2');

    expect(sanitized1).toMatchObject({});
    expect(sanitized2).toMatchObject({});
    expect(sanitized3).toMatchObject({ a: 1 });
    expect(sanitized4).toMatchObject({
      a: 1,
      c: true,
    });
    expect(sanitized5).toMatchObject({ b2: '2b' });
  });
});

describe('convert keys', () => {
  const converter = mappers.convertKeysFactory((e) => e);

  it('should convert keys with custom converter(do nothing e => e)', () => {
    const testObj = {
      a: 1,
      b2: '2b',
      c: true,
    };

    const converted = converter(testObj);

    expect(converted).toMatchObject(testObj);
  });

  // TODO name better tests
  it('deep convert keys test', () => {
    const testObj = {
      camelCase: 1,
      asDf: [
        {
          testTest: 'test',
          asd: 1,
        },
        {
          testTest: 'test',
          asd: 2,
          nextLevel: {
            someName: 'test',
            otherName: 4,
          },
        },
      ],
      snakeCase: {
        testCase: 'test',
        caseTest: 'test',
      },
    };

    const expected = {
      camel_case: 1,
      as_df: [
        {
          test_test: 'test',
          asd: 1,
        },
        {
          test_test: 'test',
          asd: 2,
          next_level: {
            some_name: 'test',
            other_name: 4,
          },
        },
      ],
      snake_case: {
        test_case: 'test',
        case_test: 'test',
      },
    };

    const actual = convertKeysFactory(_.snakeCase)(testObj, true);

    expect(actual).toStrictEqual(expected);
  });
});

describe('parseModel', () => {
  it('should return passed value if it does not contain dataValues', () => {
    const values = ['a', 1, true];
    const obj = { a: 1 };

    expect(mappers.parseModel(obj)).toMatchObject(obj);
    _.each(values, (val) => {
      const parsed = mappers.parseModel(val);
      expect(parsed).toEqual(val);
    });
  });

  it('should return dataValues if existing in object (in case of Sequelize)', () => {
    const obj = { dataValues: { a: 1, b: '2', c: true } };

    expect(mappers.parseModel(obj)).toMatchObject(obj.dataValues);
  });
});
