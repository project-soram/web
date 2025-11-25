import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(_request: NextRequest) {
  const response = NextResponse.next();
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

// 관리자 경로에만 미들웨어 적용
export const config = {
  matcher: ["/sr-adm/:path*", "/api/:path*"],
};
