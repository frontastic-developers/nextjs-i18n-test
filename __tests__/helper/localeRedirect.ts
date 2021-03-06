import { determineLocaleFromUrlAndRewriteUrls } from '../../helpers/localeRedirect'

describe('determineLocaleFromUrlAndRewriteUrls', () => {
  const expectedRedirects = [
    // Simple domains with a single locale
    { domain: 'localhost-de:3000', pathname: '/', target: '/', determinedLocale: 'de_DE' },
    { domain: 'domain.de', pathname: '/', target: '/', determinedLocale: 'de_DE' },
    { domain: 'domain-de.vercel.app', pathname: '/', target: '/', determinedLocale: 'de_DE' },
    { domain: 'domain.de', pathname: '/damen', target: '/damen', determinedLocale: 'de_DE' },
    { domain: 'localhost:3000', pathname: '/', target: '/', determinedLocale: 'de_DE' },

    { domain: 'localhost-ch:3000', pathname: '/', target: '/de/', determinedLocale: 'de_CH', redirect: true },
    { domain: 'domain-ch.vercel.app', pathname: '/', target: '/de/', determinedLocale: 'de_CH', redirect: true },
    { domain: 'domain-staging-ch.vercel.app', pathname: '/', target: '/de/', determinedLocale: 'de_CH', redirect: true },
    { domain: 'domain.ch', pathname: '/', target: '/de/', determinedLocale: 'de_CH', redirect: true },

    { domain: 'domain-staging-ch.vercel.app', pathname: '/de_DE/de/de', target: '/de', determinedLocale: 'de_CH' },
    { domain: 'domain-staging-ch.vercel.app', pathname: '/de_DE/de', target: '', determinedLocale: 'de_CH' },

    { domain: 'domain.ch:3000', pathname: '/de', target: '', determinedLocale: 'de_CH' },
    { domain: 'domain.ch:3000', pathname: '/de_DE', target: '/de/', determinedLocale: 'de_CH', redirect: true },
    { domain: 'domain.ch:3000', pathname: '/de_DE/', target: '/de/', determinedLocale: 'de_CH', redirect: true },

    { domain: 'domain-ch.vercel.app', pathname: '/', target: '/de/', determinedLocale: 'de_CH', redirect: true },
    { domain: 'domain-ch.vercel.app', pathname: '/fr', target: '', determinedLocale: 'fr_CH' },
    { domain: 'domain-ch.vercel.app', pathname: '/de/damen', target: '/damen', determinedLocale: 'de_CH' },
    { domain: 'domain-ch.vercel.app', pathname: '/fr/damen', target: '/damen', determinedLocale: 'fr_CH' },
    { domain: 'domain-ch.vercel.app', pathname: '/damen', target: '/de/damen', determinedLocale: 'de_CH', redirect: true },

    { domain: 'domain-ch.vercel.app', pathname: '/', target: '/de/', determinedLocale: 'de_CH', redirect: true },
    { domain: 'domain-ch.vercel.app', pathname: '/fr', target: '', determinedLocale: 'fr_CH' },
    { domain: 'domain-ch.vercel.app', pathname: '/de/damen', target: '/damen', determinedLocale: 'de_CH' },
    { domain: 'domain-ch.vercel.app', pathname: '/fr/damen', target: '/damen', determinedLocale: 'fr_CH' },
    { domain: 'domain-ch.vercel.app', pathname: '/damen', target: '/de/damen', determinedLocale: 'de_CH', redirect: true },
    // */
  ]

  describe.each(expectedRedirects)('Redirects', (fixture) => {
    it('redirects', () => {
      expectedRedirects.forEach((fixture) => {
        expect(determineLocaleFromUrlAndRewriteUrls(fixture.domain, fixture.pathname))
          .toEqual({ pathname: fixture.target, locale: fixture.determinedLocale, redirect: fixture.redirect || false })
      });
    });
  });
})
