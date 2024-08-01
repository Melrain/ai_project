import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
};

const isProtectedRoute = createRouteMatcher([
  '/invite(.*)',
  '/topUp(.*)',
  '/topup(.*)',
  '/topup/([a-zA-Z0-9-]+)',
  '/withdraw(.*)',
  '/admin(.*)',
  '/revenue(.*)',
  '/console(.*)',
  '/profile(.*)'
]);
