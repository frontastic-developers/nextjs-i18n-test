import { NextRequest, NextResponse } from 'next/server'
import { determineLocaleFromUrlAndRewriteUrls } from '../helpers/localeRedirect'

export function middleware(request: NextRequest) { 
  const result = determineLocaleFromUrlAndRewriteUrls(
    request.headers.get('host') || 'localhost',
    request.nextUrl.pathname
  )

  console.log('Locale detection result', result) // Log because of production cloud function error

  if (result.redirect) {
    request.nextUrl.locale = result.locale
    request.nextUrl.href = "https://" + request.headers.get('host') + result.pathname

    console.log("REDIRECT to", request.nextUrl.pathname, request.nextUrl.locale)

    return NextResponse.redirect(request.nextUrl)
  }

  if (request.nextUrl.locale !== result.locale) {
    request.nextUrl.href = "https://" + request.headers.get('host') + result.pathname
    request.nextUrl.pathname = result.pathname
    // Locale MUST be set last, otherwise it'd be overwritten again:
    request.nextUrl.locale = result.locale

    console.log("RE-WRITE to", request.nextUrl.pathname, request.nextUrl.locale)

    return NextResponse.rewrite(request.nextUrl)
  }

  return undefined
}

