import { NextResponse } from 'next/server';

export function middleware(request) {
  const auth = request.cookies.get('user');
  const { pathname } = request.nextUrl;

  // PAGE WITHOUT AUTH
  if (checkAllowPage(pathname)) {
    if (auth) return redirect('/users', request.url);

    return NextResponse.next();
  }

  // PAGE MUST AUTH
  if (!auth) return redirect('/', request.url);

  return NextResponse.next();
}

// ADD MORE ROUTE IF YOU ADD MORE PAGES
export const config = {
  matcher: ['/', '/users']
};

const redirect = (link, url) => NextResponse.redirect(new URL(link, url));

const PAGE_WITHOUT_AUTH = ['/'];

const checkAllowPage = (pathname) => PAGE_WITHOUT_AUTH.includes(pathname);
