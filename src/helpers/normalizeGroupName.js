export const register = (handlebars) => {

  /**
   * normalize group name
   *
   * @param {String} value value
   * @return {String}
   *
   * @example ```hbs
   * {{normalizeGroupName value}}
   * ```
   */
  handlebars.registerHelper('normalizeGroupName', (value = '') => {
    if (value === 'undefined') {
      return new handlebars.SafeString('General');
    }
    return new handlebars.SafeString(
      `${value.charAt(0).toUpperCase()}${value.slice(1)}` // eslint-disable-line no-magic-numbers
    );
  });
};
