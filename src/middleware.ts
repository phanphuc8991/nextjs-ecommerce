export { auth as middleware } from "@/auth"  
export const config = {
  // Chặn tất cả trừ file tĩnh, api và trang login/auth
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|auth|verify).*)'],
}