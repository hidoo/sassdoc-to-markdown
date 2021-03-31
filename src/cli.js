import fs from 'fs-extra';
import meow from 'meow';
import sassdoc2md from '.';

const cli = meow(
  `
  Usage
    $ sassdoc2md <src> [dest]

  Options
    --markdown, -m  markdown that inject document
    --section, -s   section that inject to markdown (default: API)

  Customize Options
    --type-order    order of context type (default: variable,placeholder,function,mixin)
    --template      file path of custom handlebars template
    --partials      glob pattern of handlebars partials (ex. path/to/partial/*.hbs)
    --helpers       glob pattern of handlebars helpers (ex. path/to/helpers/*.js)

  Supported SassDoc Options
    --exclude
    --autofill
    --verbose, -v
    --strict
    --debug

  Examples
    $ sassdoc2md ./src/scss/*.scss
    $ sassdoc2md ./src/scss/*.scss -m ./src/README.md -s API
    $ sassdoc2md ./src/scss/*.scss ./dest/README.md
    $ sassdoc2md ./src/scss/*.scss ./dest/README.md -m ./src/README.md -s API
  `,
  {
    flags: {
      markdown: {
        type: 'string',
        alias: 'm'
      },
      section: {
        'type': 'string',
        'alias': 's',
        'default': 'API'
      },

      // Customize Options
      typeOrder: {
        'type': 'string',
        'default': 'variable,placeholder,function,mixin'
      },
      template: {
        type: 'string'
      },
      partials: {
        type: 'string'
      },
      helpers: {
        type: 'string'
      },

      // SassDoc Options
      exclude: {
        type: 'string'
      },
      autofill: {
        type: 'string'
      },
      verbose: {
        type: 'boolean',
        alias: 'v'
      },
      strict: {
        type: 'boolean'
      },
      debug: {
        type: 'boolean'
      }
    }
  }
);

/**
 * normalize options
 *
 * @param {Object} options options
 * @return {Object}
 */
function normalizeOptions(options = {}) {
  const arrayOpts = ['typeOrder', 'exclude', 'autofill'];

  return Object.entries(options)
    .reduce((prev, [key, value]) => {
      let values = value;

      if (arrayOpts.includes(key)) {
        values = value.split(',').map((val) => val.trim());
      }
      return {...prev, [key]: values};
    }, {});
}

(async () => {
  try {
    const [src, dest] = cli.input;
    const options = normalizeOptions(cli.flags);
    const result = await sassdoc2md(src, options);

    if (dest) {
      return fs.outputFile(dest, result);
    }
    return console.log(result);
  }
  catch (error) {
    return console.error(error.message);
  }
})();
