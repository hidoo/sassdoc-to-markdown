import fs from 'node:fs/promises';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import inject from 'mdast-util-inject';
import getData from './getData.js';
import initTemplate from './initTemplate.js';

/**
 * default options
 *
 * @typedef {Object} defaultOptions default options
 * @property {String} markdown markdown that inject document
 * @property {String} section section that inject to markdown
 * @property {Object} remarkGfmOptions options for remark-gfm
 * @property {Object} remarkStringifyOptions options for remark-stringify
 */
const defaultOptions = {
  markdown: null,
  section: 'API',
  remarkGfmOptions: {
    tablePipeAlign: false,
    tableCellPadding: false
  },
  remarkStringifyOptions: {
    fences: true,
    bullet: '+',
    listItemIndent: 'one',
    emphasis: '*'
  }
};

/**
 * sassdoc to markdown
 *
 * @param {String|Array<String>} src glob pattern of source files of SassDoc
 * @param {defaultOptions} options options
 * @return {Promise<String>}
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
    remarkGfmOptions,
    remarkStringifyOptions,
    ...opts
  } = {
    ...defaultOptions,
    ...options
  };
  const data = await getData(src, opts);

  if (!data) {
    throw new Error('Could not find anything to document.');
  }

  const template = await initTemplate(opts);
  const processor = await remark()
    .data({ settings: remarkStringifyOptions })
    .use(remarkGfm, remarkGfmOptions);
  const ast = processor.parse(template(data));

  if (typeof markdown === 'string') {
    const targetAst = processor.parse(await fs.readFile(markdown));

    if (!inject(section, targetAst, ast)) {
      throw new Error(`Target section "${section}" is not found.`);
    }
    return processor.stringify(targetAst);
  }
  return processor.stringify(ast);
}
