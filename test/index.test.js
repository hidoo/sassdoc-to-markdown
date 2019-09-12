/* eslint max-len: off, no-magic-numbers: off, no-sync: off */

import assert from 'assert';
import fs from 'fs';
import sassdoc2md from '../src';

describe('sassdoc2md', () => {

  it('should return markdown string that documentaized by SassDoc.', async () => {
    const src = `${__dirname}/fixture/**/*.scss`,
          actual = await sassdoc2md(src),
          expected = fs.readFileSync(`${__dirname}/fixture/markdown/expected.md`).toString();

    assert(typeof actual === 'string');
    assert(actual === expected);
  });

  it('should throw error if SassDoc could not find anything to document.', async () => {
    try {
      const src = './no-exists/*.scss';

      await sassdoc2md(src);
    }
    catch (error) {
      assert(error instanceof Error);
    }
  });

  it('should return markdown string that injected document if argument "options.markdown" is set.', async () => {
    const src = `${__dirname}/fixture/**/*.scss`,
          options = {markdown: `${__dirname}/fixture/markdown/docs.md`},
          actual = await sassdoc2md(src, options),
          expected = fs.readFileSync(`${__dirname}/fixture/markdown/expected-markdown.md`).toString();

    assert(typeof actual === 'string');
    assert(actual === expected);
  });

  it('should throw error if markdown specified by argument "options.markdown" does not found.', async () => {
    try {
      const src = `${__dirname}/fixture/**/*.scss`,
            options = {markdown: 'not-exist/docs.md'};

      await sassdoc2md(src, options);
    }
    catch (error) {
      assert(error instanceof Error);
    }
  });

  it('should return markdown string that injected document to specified section if argument "options.section" is set.', async () => {
    const src = `${__dirname}/fixture/**/*.scss`,
          options = {
            markdown: `${__dirname}/fixture/markdown/docs.md`,
            section: 'License'
          },
          actual = await sassdoc2md(src, options),
          expected = fs.readFileSync(`${__dirname}/fixture/markdown/expected-section.md`).toString();

    assert(typeof actual === 'string');
    assert(actual === expected);
  });

  it('should throw error if target section specified by argument "options.section" does not found.', async () => {
    try {
      const src = `${__dirname}/fixture/**/*.scss`,
            options = {
              markdown: `${__dirname}/fixture/markdown/docs.md`,
              section: 'Section Not Exists'
            };

      await sassdoc2md(src, options);
    }
    catch (error) {
      assert(error instanceof Error);
    }
  });
});
