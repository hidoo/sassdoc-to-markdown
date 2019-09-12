import {parse} from 'sassdoc';

/**
 * default options
 *
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
 *
 * @param {String|Array<String>} src glob pattern of source files of SassDoc
 * @param {Object} [options={}] options
 *   @param {Array<String>} options.typeOrder order of types
 * @return {Object|null}
 *
 * @example
 * (async () => {
 *   await getData('./path/to/scss', {});
 *   // => {groupName: [item, ...], 'undefined': [item, ...]}
 * })();
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

  return Array.from(items).reduce((prev, [key, value]) => {
    return {
      ...prev,
      [key]: value.sort((valA, valB) => {
        const valAType = valA.context.type;
        const valBType = valB.context.type;

        if (valAType === valBType) {
          return valA.file.path.localeCompare(valB.file.path) ||
            valA.context.line.start - valB.context.line.start ||
            valA.context.name.localeCompare(valB.context.name);
        }
        return typeOrder.indexOf(valAType) - typeOrder.indexOf(valBType);
      })
    };
  }, {});
}
