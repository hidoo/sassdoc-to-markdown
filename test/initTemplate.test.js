import assert from 'node:assert';
import path from 'node:path';
import url from 'node:url';
import initTemplate from '../src/initTemplate.js';

describe('initTemplate', () => {
  let dirname = null;
  let fixtureDir = null;

  before(() => {
    dirname = path.dirname(url.fileURLToPath(import.meta.url));
    fixtureDir = path.join(dirname, 'fixture');
  });

  context('if no template specified by options.template is found.', () => {
    it('should throw error.', async () => {
      let err = null;

      try {
        await initTemplate({ template: 'not-exist.hbs' });
      } catch (error) {
        err = error;
      }

      assert(err instanceof Error);
    });
  });

  context('if templates specified by options.template are found.', () => {
    it('should return function.', async () => {
      const actual = await initTemplate();

      assert(typeof actual, 'function');
    });

    context('with options.template.', () => {
      it('should return function compiled from the specified template.', async () => {
        const actual = await initTemplate({
          template: path.join(fixtureDir, 'template', 'exist.hbs')
        });
        const rendered = actual({ message: 'hoge' });

        assert.equal(typeof actual, 'function');
        assert.equal(rendered, 'specified template hoge.\n');
      });
    });

    context('with options.helpers.', () => {
      it('should return function compiled with the specified helpers.', async () => {
        const actual = await initTemplate({
          template: path.join(fixtureDir, 'template', 'with-helpers.hbs'),
          helpers: `${fixtureDir}/helpers/*.js`
        });
        const rendered = actual({ message: 'hoge' });

        assert.equal(typeof actual, 'function');
        assert.equal(rendered, 'specified helpers hoge.\n');
      });
    });

    context('with options.partials.', () => {
      it('should return function compiled with the specified partials.', async () => {
        const actual = await initTemplate({
          template: path.join(fixtureDir, 'template', 'with-partials.hbs'),
          partials: `${fixtureDir}/template/partials/*.hbs`
        });
        const rendered = actual({ message: 'hoge' });

        assert.equal(typeof actual, 'function');
        assert.equal(rendered, 'specified partials hoge.\n');
      });
    });
  });
});
