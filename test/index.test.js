import assert from 'node:assert';
import fs from 'node:fs/promises';
import path from 'node:path';
import url from 'node:url';
import sassdoc2md from '../src/index.js';

/**
 * read built file
 *
 * @param {String} file filename
 * @return {String}
 */
async function readBuiltFile(file) {
  const content = await fs.readFile(file);

  return content.toString().trim();
}

describe('sassdoc2md', () => {
  let dirname = null;
  let fixtureDir = null;

  before(() => {
    dirname = path.dirname(url.fileURLToPath(import.meta.url));
    fixtureDir = path.join(dirname, 'fixture');
  });

  context('by default.', () => {
    it('should return markdown string documented by SassDoc.', async () => {
      const src = `${fixtureDir}/**/*.scss`;
      const actual = await sassdoc2md(src);
      const expected = await readBuiltFile(
        path.join(fixtureDir, 'markdown', 'expected.md')
      );

      assert.equal(typeof actual, 'string');
      assert.equal(actual.trim(), expected);
    });

    context('if no document is found anything.', () => {
      it('should throw error.', async () => {
        let err = null;

        try {
          await sassdoc2md('./no-exists/*.scss');
        } catch (error) {
          err = error;
        }

        assert(err instanceof Error);
      });
    });
  });

  context('with options.markdown.', () => {
    it('should return markdown string that injected document.', async () => {
      const src = `${fixtureDir}/**/*.scss`;
      const options = {
        markdown: path.join(fixtureDir, 'markdown', 'docs.md')
      };
      const actual = await sassdoc2md(src, options);
      const expected = await readBuiltFile(
        path.join(fixtureDir, 'markdown', 'expected-markdown.md')
      );

      assert.equal(typeof actual, 'string');
      assert.equal(actual.trim(), expected);
    });

    context('if no markdown file is found.', () => {
      it('should throw error.', async () => {
        let err = null;

        try {
          const src = `${fixtureDir}/**/*.scss`;
          const options = { markdown: 'not-exist/docs.md' };

          await sassdoc2md(src, options);
        } catch (error) {
          err = error;
        }

        assert(err instanceof Error);
      });
    });
  });

  context('with options.section.', () => {
    it('should return markdown string that injected document.', async () => {
      const src = `${fixtureDir}/**/*.scss`;
      const options = {
        markdown: path.join(fixtureDir, 'markdown', 'docs.md'),
        section: 'License'
      };
      const actual = await sassdoc2md(src, options);
      const expected = await readBuiltFile(
        path.join(fixtureDir, 'markdown', 'expected-section.md')
      );

      assert.equal(typeof actual, 'string');
      assert.equal(actual.trim(), expected);
    });

    context('if no section is found.', () => {
      it('should throw error.', async () => {
        let err = null;

        try {
          const src = `${fixtureDir}/**/*.scss`;
          const options = {
            markdown: path.join(fixtureDir, 'markdown', 'docs.md'),
            section: 'Section Not Exists'
          };

          await sassdoc2md(src, options);
        } catch (error) {
          err = error;
        }

        assert(err instanceof Error);
      });
    });
  });
});
