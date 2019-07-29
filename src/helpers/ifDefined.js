export const register = (handlebars) => {

  /**
   * if value is defined or not
   * @param {Any} value value
   * @param {Object} options options of Handlebars
   * @return {String}
   *
   * @example
   *   {{#ifDefined value}}
   *     {{value}}
   *   {{/ifDefined}}
   */
  handlebars.registerHelper('ifDefined', function(value, options = {}) {
    const self = this; // eslint-disable-line no-invalid-this

    if (typeof value !== 'undefined') {
      return options.fn(self);
    }
    return options.inverse(self);
  });
};
