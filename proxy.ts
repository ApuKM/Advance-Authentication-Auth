import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function proxy(request: NextRequest) {
  return NextResponse.redirect(new URL('/protected', request.url))
}
export const config = {
  matcher: ["/protected"],
};