import fs from 'fs';
import path from 'path';
import {promisify} from 'util';
import glob from 'glob';
import Handlebars from 'handlebars';

const asyncReadFile = promisify(fs.readFile),
      asyncGlob = promisify(glob);

/**
 * default options
 *
 * @type {Object}
 */
const defaultOptions = {
  template: path.resolve(__dirname, '../template/index.hbs'),
  partials: path.resolve(__dirname, '../template/partials/*.hbs'),
  helpers: path.resolve(__dirname, './helpers/**/*.js')
};

/**
 * init template
 *
 * @param {Object} [options={}] options
 *   @param {String} options.template template path
 *   @param {String} options.partials glob pattern of partials
 *   @param {String} options.helpers glob pattern of helpers
 * @return {Function}
 *
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
  const opts = {...defaultOptions, ...options},
        hbs = Handlebars.create(),
        template = await asyncReadFile(opts.template)
          .then((content) => content.toString());

  // register partials
  await asyncGlob(opts.partials).then((files) => Promise.all(
    files.map(
      (file) => asyncReadFile(file)
        .then((content) => {
          hbs.registerPartial(
            path.basename(file, path.extname(file)),
            content.toString()
          );
        })
    )
  ));

  // register helpers
  await asyncGlob(opts.helpers).then(
    (files) => files.forEach((file) => {
      const helper = require(file); // eslint-disable-line global-require, import/no-dynamic-require

      if (typeof helper.register === 'function') {
        helper.register(hbs);
      }
    })
  );

  return hbs.compile(template);
}
