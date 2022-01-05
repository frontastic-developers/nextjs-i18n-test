export const determineLocaleFromUrlAndRewriteUrls = (hostname: string, locale: string, pathname: string): { locale: string, pathname: string, redirect: boolean } => {
    let result = {
        locale,
        pathname,
        redirect: false,
    }

    const territoryLanguageMap: { [ key:string ]: Array<string> } = {
        DE: ['de'],
        BE: ['nl', 'fr'],
        CH: ['de', 'fr'],
        EU: ['en'],
        NL: ['nl'],
        AT: ['de'],
    }

    console.log(hostname, locale, pathname)

    // @HACK: Vercel on production prepends `/de_DE` to the path, and we, right
    // now, have no idea where this comes from. This actually leads to endless
    // redirects from `/nl` to `/nl` for the Belgium side (only on production).
    // Therefor we strip in from the incoming path to not confuse things:
    pathname = pathname.replace(/^\/de_DE/, '') || '/'

    let territory = 'DE' // Determines the default locale
    let matches = hostname.match(/[.-](de|be|ch|eu|nl|at)/i)
    if (matches) {
        territory = matches[1].toUpperCase()
    }

    // Case for domains with a single locale
    if (territoryLanguageMap[territory].length < 2) {
        result.locale = territoryLanguageMap[territory][0] + '_' + territory
        result.pathname = pathname
        return result
    }

    // Domain has multiple languages assigned
    matches = pathname.match(/^\/(nl|de|fr|en)(_(DE|BE|CH|EU|NL|AT))?/i)
    if (matches && territoryLanguageMap[territory].includes(matches[1])) {
        result.locale = matches[1] + '_' + territory
        result.pathname = pathname.replace(/^(\/(nl|de|fr|en)(_(DE|BE|CH|EU|NL|AT))?)+/i, '') 
        return result
    }

    const language = territoryLanguageMap[territory][0]
    result.locale = language + '_' + territory
    result.pathname = '/' + language + pathname.replace(/^(\/(nl|de|fr|en)(_(DE|BE|CH|EU|NL|AT))?)+/i, '')
    result.redirect = true
    return result
}
