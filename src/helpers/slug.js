export const register = (handlebars) => {

  /**
   * return item slug
   * @param {Array<String>} groups list of groups of item
   * @param {String} type type of item
   * @param {String} name type of name
   * @return {String}
   *
   * @example
   *   {{slug item.groups item.type. item.name}}
   */
  handlebars.registerHelper('slug', (groups = [], type = '', name = '') => {
    const [primaryGroup] = groups,
          raw = `${primaryGroup === 'undefined' ? 'general' : primaryGroup}-${type}-${name}`; // eslint-disable-line max-len

    return new handlebars.SafeString(raw.replace(/[\s#?<>.,&]/g, '-'));
  });
};
