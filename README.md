# @hidoo/sassdoc-to-markdown

> Generate markdown document use SassDoc.

## Installation

```sh
$ npm install @hidoo/sassdoc-to-markdown
```

## Usage

```sh
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
```

### via Node API

```js
import sassdoc2md from '@hidoo/sassdoc-to-markdown';

sassdoc2md('./src/scss/*.scss')
  .then((markdown) => {
    console.log(markdown);
  });
```

## Test

```sh
$ yarn test
```

## License

MIT
