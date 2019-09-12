import {promisify} from 'util';
import fs from 'fs-extra';
import remark from 'remark';
import inject from 'mdast-util-inject';
import getData from './getData';
import initTemplate from './initTemplate';

const asyncReadFile = promisify(fs.readFile);

/**
 * default options
 *
 * @type {Object}
 */
const defaultOptions = {
  markdown: null,
  section: 'API',
  remarkParseOptions: {
    gfm: true
  },
  remarkStringifyOptions: {
    gfm: true,
    fences: true,
    bullet: '+',
    listItemIndent: '1',
    emphasis: '*'
  }
};

/**
 * sassdoc to markdown
 *
 * @param {String|Array<String>} src glob pattern of source files of SassDoc
 * @param {Object} options options
 *   @param {String} [options.markdown=null] markdown that inject document
 *   @param {String} [options.section='API'] section that inject to markdown
 *   @param {Object} [options.remarkParseOptions={}] options for remark.parse
 *   @param {Object} [options.remarkStringifyOptions={}] options for remark.stringify
 * @return {Promise<String>}
 *
 * @example
 * (async () => {
 *   const markdown = await sassdoc2md('./path/to/scss/*.scss');
 * })();
 */
export default async function sassdoc2md(src = '', options = {}) {
  if (typeof src !== 'string' || src === '') {
    throw new TypeError('Argument "src" is required.');
  }

  const {
          markdown,
          section,
          remarkParseOptions,
          remarkStringifyOptions,
          ...restOpts
        } = {...defaultOptions, ...options},
        data = await getData(src, restOpts);

  if (!data) {
    throw new Error('Could not find anything to document.');
  }

  const parser = remark().use({settings: remarkParseOptions}),
        renderer = remark().use({settings: remarkStringifyOptions}),
        template = await initTemplate(restOpts),
        ast = parser.parse(template(data));

  if (typeof markdown === 'string') {
    const targetAst = parser.parse(await asyncReadFile(markdown));

    if (!inject(section, targetAst, ast)) {
      throw new Error(`Target section "${section}" is not found.`);
    }
    return renderer.stringify(targetAst);
  }
  return renderer.stringify(ast);
}
