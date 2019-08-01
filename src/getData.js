import {parse} from 'sassdoc';

/**
 * default options
 * @type {Object}
 */
const defaultOptions = {
  typeOrder: [
    'variable',
    'placeholder',
    'function',
    'mixin'
  ]
};

/**
 * get sassdoc data
 * @param {String|Array<String>} src glob pattern of source files of SassDoc
 * @param {Object} [options={}] options
 *   @param {Array<String>} options.typeOrder order of types
 * @return {Object|null}
 *
 * @example
 *   await getData('./path/to/scss', {});
 *   // => {groupName: [item, ...], 'undefined': [item, ...]}
 */
export default async function getData(src = '', options = {}) {
  const opts = {...defaultOptions, ...options},
        {typeOrder, ...restOpts} = opts,
        parsedData = await parse(src, restOpts);

  if (!Array.isArray(parsedData) || !parsedData.length) {
    return null;
  }

  const items = new Map();

  parsedData.forEach((item) => {
    const [group = 'undefined'] = item.group;

    if (items.has(group)) {
      items.set(group, [...items.get(group), item]);
    }
    else {
      items.set(group, [item]);
    }
  });

  return Array.from(items).reduce((prev, [key, value]) => ({
    ...prev,
    [key]: value.sort((a, b) => {
      if (a.context.type === b.context.type) {
        return a.file.path.localeCompare(b.file.path) ||
          a.context.line.start - b.context.line.start ||
          a.context.name.localeCompare(b.context.name);
      }
      return typeOrder.indexOf(a.context.type) - typeOrder.indexOf(b.context.type);
    })
  }), {});
}
