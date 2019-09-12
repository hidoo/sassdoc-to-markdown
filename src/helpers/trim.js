export const register = (handlebars) => {

  /**
   * trim whitespaces
   *
   * @param {String} value value
   * @return {String}
   *
   * @example ```hbs
   * {{trim value}}
   * ```
   */
  handlebars.registerHelper('trim', (value = '') => {
    if (typeof value === 'string') {
      return new handlebars.SafeString(value.trim());
    }
    return new handlebars.SafeString(value);
  });
};
