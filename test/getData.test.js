/* eslint max-len: 0, no-magic-numbers: 0 */

import assert from 'assert';
import getData from '../src/getData';

describe('getData', () => {

  it('should return null if argument "src" is not set.', async () => {
    const actual = await getData();

    assert(actual === null);
  });

  it('should return null if scss files that specified by argument "src" does not exists.', async () => {
    const cases = [
      './not-exists/*.scss',
      ['./not-exists/*.scss']
    ];

    await Promise.all(cases.map((src) =>
      getData(src)
        .then((actual) => {
          assert(actual === null);
        })
    ));
  });

  it('should return object that has items divided by groups.', async () => {
    const actual = await getData(`${__dirname}/fixture/**/*.scss`);

    assert(actual !== null);
    assert(typeof actual === 'object');
    assert(Array.isArray(actual.settings));
    assert(Array.isArray(actual.undefined));
  });

  it('should return object that has items sorted by argument "options.typeOrder".', async () => {
    const typeOrder = [
            'function',
            'variable',
            'mixin',
            'placeholder'
          ],
          actualTypeOrder = [];

    const actual = await getData(`${__dirname}/fixture/**/*.scss`, {typeOrder});

    assert(actual !== null);
    assert(typeof actual === 'object');

    actual.undefined.forEach((item) => {
      const {type} = item.context;

      if (!actualTypeOrder.includes(type)) {
        actualTypeOrder.push(type);
      }
    });

    assert.deepStrictEqual(actualTypeOrder, typeOrder);
  });
});
