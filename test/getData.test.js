import assert from 'node:assert';
import path from 'node:path';
import url from 'node:url';
import getData from '../src/getData.js';

describe('getData', () => {
  let dirname = null;

  before(() => {
    dirname = path.dirname(url.fileURLToPath(import.meta.url));
  });

  context('if "src" is not set.', () => {
    it('should return null.', async () => {
      const actual = await getData();

      assert.equal(actual, null);
    });
  });

  context('if no file matching the glob pattern specified by "src".', () => {
    it('should return null.', async () => {
      const cases = ['./not-exists/*.scss', ['./not-exists/*.scss']];

      await Promise.all(
        cases.map(async (src) => {
          const actual = await getData(src);

          assert.equal(actual, null);
        })
      );
    });
  });

  context('if files matching the glob pattern specified by "src".', () => {
    it('should return object that has items divided by groups.', async () => {
      const actual = await getData(`${dirname}/fixture/**/*.scss`);

      assert.notEqual(actual, null);
      assert.equal(typeof actual, 'object');
      assert(Array.isArray(actual.settings));
      assert(Array.isArray(actual.undefined));
    });

    it('should return object that has items sorted by "options.typeOrder".', async () => {
      const typeOrder = ['function', 'variable', 'mixin', 'placeholder'];
      const actualTypeOrder = [];

      const actual = await getData(`${dirname}/fixture/**/*.scss`, {
        typeOrder
      });

      assert(actual !== null);
      assert(typeof actual === 'object');

      actual.undefined.forEach((item) => {
        const { type } = item.context;

        if (!actualTypeOrder.includes(type)) {
          actualTypeOrder.push(type);
        }
      });

      assert.deepEqual(actualTypeOrder, typeOrder);
    });
  });
});
