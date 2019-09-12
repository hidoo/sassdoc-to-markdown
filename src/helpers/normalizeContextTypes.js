/**
 * context type mappings
 *
 * @type {Object}
 */
const contextTypes = new Map([
  ['variable', '$'],
  ['placeholder', '%'],
  ['function', '@function '],
  ['mixin', '@mixin ']
]);

export const register = (handlebars) => {

  /**
   * normalize group name
   *
   * @param {String} value context type ("variable", "placeholder", "function" or "mixin")
   * @return {String}
   *
   * @example ```hbs
   * {{normalizeContextTypes value}}
   * ```
   */
  handlebars.registerHelper('normalizeContextTypes', (value = '') => {
    if (contextTypes.has(value)) {
      return new handlebars.SafeString(contextTypes.get(value));
    }
    return new handlebars.SafeString(value);
  });
};
