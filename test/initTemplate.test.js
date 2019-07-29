/* eslint max-len: 0, no-magic-numbers: 0 */

import assert from 'assert';
import initTemplate from '../src/initTemplate';

describe('initTemplate', () => {

  it('should return function.', async () => {
    const actual = await initTemplate();

    assert(typeof actual === 'function');
  });

  it('should use specified template if argument "options.template" is set.', async () => {
    const actual = await initTemplate({
            template: `${__dirname}/fixture/template/exist.hbs`
          }),
          rendered = actual({message: 'hoge'});

    assert(typeof actual === 'function');
    assert(rendered === 'specified template hoge.\n');
  });

  it('should throw error if template file that specified by argument "options.template" does not exists.', async () => {
    try {
      await initTemplate({template: 'not-exist.hbs'});
    }
    catch (error) {
      assert(error instanceof Error);
    }
  });

  it('should load helpers if helper files that specified by argument "options.helpers" exists.', async () => {
    const actual = await initTemplate({
            template: `${__dirname}/fixture/template/with-helpers.hbs`,
            helpers: `${__dirname}/fixture/helpers/*.js`
          }),
          rendered = actual({message: 'hoge'});

    assert(typeof actual === 'function');
    assert(rendered === 'specified helpers hoge.\n');
  });

  it('should load partials if partial files that specified by argument "options.partials" exists.', async () => {
    const actual = await initTemplate({
            template: `${__dirname}/fixture/template/with-partials.hbs`,
            partials: `${__dirname}/fixture/template/partials/*.hbs`
          }),
          rendered = actual({message: 'hoge'});

    assert(typeof actual === 'function');
    assert(rendered === 'specified partials hoge.\n');
  });
});
