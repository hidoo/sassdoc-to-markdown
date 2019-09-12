export const register = (handlebars) => {

  /**
   * noop
   *
   * @param {String} value value
   * @return {String}
   *
   * @example ```hbs
   * {{noop value}}
   * ```
   */
  handlebars.registerHelper('noop', (value) => value);
};
