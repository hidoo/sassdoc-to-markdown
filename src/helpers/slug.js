export const register = (handlebars) => {

  /**
   * return item slug
   *
   * @param {Array<String>} groups list of groups of item
   * @param {String} type type of item
   * @param {String} name type of name
   * @return {String}
   *
   * @example ```hbs
   * {{slug item.groups item.type. item.name}}
   * ```
   */
  handlebars.registerHelper('slug', (groups = [], type = '', name = '') => {
    const [primaryGroup] = groups,
          raw = `${primaryGroup === 'undefined' ? 'general' : primaryGroup}-${type}-${name}`;

    return new handlebars.SafeString(raw.replace(/[\s#?<>.,&]/g, '-'));
  });
};
