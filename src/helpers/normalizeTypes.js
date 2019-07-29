/**
 * url of document
 * @var {String}
 */
const docmentURL = 'https://sass-lang.com/documentation/values/';

/**
 * type mappings
 * @type {Object}
 */
const types = {
  Number: {
    pattern: /^[N|n]umbers?$/,
    url: `${docmentURL}numbers`
  },
  String: {
    pattern: /^[S|s]trings?$/,
    url: `${docmentURL}strings`
  },
  Color: {
    pattern: /^[C|c]olors?$/,
    url: `${docmentURL}colors`
  },
  List: {
    pattern: /^[L|l]ists?$/,
    url: `${docmentURL}lists`
  },
  Map: {
    pattern: /^[M|m]aps?$/,
    url: `${docmentURL}maps`
  },
  Boolean: {
    pattern: /^[B|b]ool(ean)?$/,
    url: `${docmentURL}booleans`
  },
  Null: {
    pattern: /^[N|n]ull?$/,
    url: `${docmentURL}null`
  },
  Function: {
    pattern: /^[F|f]unctions?$/,
    url: `${docmentURL}functions`
  }
};

export const register = (handlebars) => {

  /**
   * normalize types
   * @param {String} value value
   * @return {String}
   *
   * @example
   *   {{normalizeTypes value}}
   */
  handlebars.registerHelper('normalizeTypes', (value = '') => {
    if (typeof value !== 'string' || value === '') {
      return value;
    }

    const values = value.split('|')
      .map((val) => {
        const rawType = val.trim();
        let type = rawType;

        Object.entries(types).forEach(([key, {pattern, url}]) => {
          if (pattern.test(rawType)) {
            type = `[${key}](${url})`;
          }
        });

        return type;
      });

    return new handlebars.SafeString(values.join(' | '));
  });
};
