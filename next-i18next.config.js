const path = require('path');

module.exports = {
  i18n: {
    locales: ['de_DE', 'nl_NL', 'fr_CH', 'de_CH', 'nl_BE', 'de_AT', 'en_EU'],
    defaultLocale: 'de_DE',
    localeDetection: false,
  },  
  localePath: path.resolve('./public/locales'),
};
