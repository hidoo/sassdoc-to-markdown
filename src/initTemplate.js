import fs from 'node:fs/promises';
import path from 'node:path';
import url from 'node:url';
import { glob } from 'glob';
import Handlebars from 'handlebars';

const dirname = path.dirname(url.fileURLToPath(import.meta.url));

/**
 * default options
 *
 * @typedef {Object} defaultOptions default options
 * @property {String} template template path
 * @property {String} partials glob pattern of partials
 * @property {String} helpers glob pattern of helpers
 */
const defaultOptions = {
  template: path.resolve(dirname, '../template/index.hbs'),
  partials: path.resolve(dirname, '../template/partials/*.hbs'),
  helpers: path.resolve(dirname, './helpers/**/*.js')
};

/**
 * init template
 *
 * @param {defaultOptions} options options
 * @return {Promise<import('handlebars').Template>}
 * @example
 * (async () => {
 *   const template = await initTemplate({
 *     template: 'path/to/template.hbs',
 *     partials: 'path/to/partials/*.hbs',
 *     helpers: 'path/to/helpers/*.js'
 *   });
 * })();
 */
export default async function initTemplate(options = {}) {
  const opts = { ...defaultOptions, ...options };
  const hbs = Handlebars.create();
  const template = (await fs.readFile(opts.template)).toString();

  // register partials
  {
    const files = await glob(opts.partials);

    await Promise.all(
      files.map(async (file) => {
        const content = (await fs.readFile(file)).toString();

        hbs.registerPartial(path.basename(file, path.extname(file)), content);
      })
    );
  }

  // register helpers
  {
    const files = await glob(opts.helpers);

    await Promise.all(
      files.map(async (file) => {
        const helper = await import(file);

        if (typeof helper.register === 'function') {
          helper.register(hbs);
        }
      })
    );
  }

  return hbs.compile(template);
}
