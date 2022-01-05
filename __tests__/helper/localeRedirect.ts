import { determineLocaleFromUrlAndRewriteUrls } from '../../helpers/localeRedirect'

describe('determineLocaleFromUrlAndRewriteUrls', () => {
  const expectedRedirects = [
    // Simple domains with a single locale
    { domain: 'localhost-de:3000', pathname: '/', target: '/', determinedLocale: 'de_DE', redirect: false },
    { domain: 'tomtailor.de', pathname: '/', target: '/', determinedLocale: 'de_DE', redirect: false },
    { domain: 'tomtailor-de.vercel.app', pathname: '/', target: '/', determinedLocale: 'de_DE', redirect: false },
    { domain: 'tomtailor.de', pathname: '/damen', target: '/damen', determinedLocale: 'de_DE', redirect: false },
    { domain: 'localhost:3000', pathname: '/', target: '/', determinedLocale: 'de_DE', redirect: false },

    { domain: 'localhost-be:3000', pathname: '/', target: '/nl/', determinedLocale: 'nl_BE', redirect: true },
    { domain: 'tomtailor-be.vercel.app', pathname: '/', target: '/nl/', determinedLocale: 'nl_BE', redirect: true },
    { domain: 'tomtailor-staging-be.vercel.app', pathname: '/', target: '/nl/', determinedLocale: 'nl_BE', redirect: true },
    { domain: 'tomtailor.be', pathname: '/', target: '/nl/', determinedLocale: 'nl_BE', redirect: true },

    { domain: 'tomtailor-staging-be.vercel.app', pathname: '/de_DE/nl/nl', target: '/nl/nl', determinedLocale: 'nl_BE', redirect: false },
    { domain: 'tomtailor-staging-be.vercel.app', pathname: '/de_DE/nl', target: '/nl', determinedLocale: 'nl_BE', redirect: false },

    { domain: 'tomtailor.be:3000', pathname: '/de', target: '/nl', determinedLocale: 'nl_BE', redirect: true },
    { domain: 'tomtailor.be:3000', pathname: '/de_DE', target: '/nl/', determinedLocale: 'nl_BE', redirect: true },
    { domain: 'tomtailor.be:3000', pathname: '/de_DE/', target: '/nl/', determinedLocale: 'nl_BE', redirect: true },

    { domain: 'tomtailor-be.vercel.app', pathname: '/', target: '/nl/', determinedLocale: 'nl_BE', redirect: true },
    { domain: 'tomtailor-be.vercel.app', pathname: '/fr', target: '/fr', determinedLocale: 'fr_BE', redirect: false },
    { domain: 'tomtailor-be.vercel.app', pathname: '/nl/damen', target: '/nl/damen', determinedLocale: 'nl_BE', redirect: false },
    { domain: 'tomtailor-be.vercel.app', pathname: '/fr/damen', target: '/fr/damen', determinedLocale: 'fr_BE', redirect: false },
    { domain: 'tomtailor-be.vercel.app', pathname: '/damen', target: '/nl/damen', determinedLocale: 'nl_BE', redirect: true },

    { domain: 'tomtailor-ch.vercel.app', pathname: '/', target: '/de/', determinedLocale: 'de_CH', redirect: true },
    { domain: 'tomtailor-ch.vercel.app', pathname: '/fr', target: '/fr', determinedLocale: 'fr_CH', redirect: false },
    { domain: 'tomtailor-ch.vercel.app', pathname: '/de/damen', target: '/de/damen', determinedLocale: 'de_CH', redirect: false },
    { domain: 'tomtailor-ch.vercel.app', pathname: '/fr/damen', target: '/fr/damen', determinedLocale: 'fr_CH', redirect: false },
    { domain: 'tomtailor-ch.vercel.app', pathname: '/damen', target: '/de/damen', determinedLocale: 'de_CH', redirect: true },
    // */
  ]

  describe.each(expectedRedirects)('Redirects', (fixture) => {
    it('redirects', () => {
      expectedRedirects.forEach((fixture) => {
        expect(determineLocaleFromUrlAndRewriteUrls(fixture.domain, fixture.locale, fixture.pathname))
          .toEqual({ pathname: fixture.target, locale: fixture.determinedLocale, redirect: fixture.redirect })
      });
    });
  });
})
