export class Config {
  static API_URL: string = import.meta.env.VITE_API_URL || "";
  static API_KEY: string = import.meta.env.VITE_API_KEY || "";
  static API_IV: string = import.meta.env.VITE_API_IV || "";
  static COOKIE_NAME: string = import.meta.env.VITE_COOKIE_NAME || "ebr";
  static TZ: string = import.meta.env.VITE_TZ || "Asia/Bangkok";
  static PUBLIC_PATH: string[] = ["/_next", "/fonts", "/images", "/favicon.ico", "/upload", "/assets"];
  static PUBLIC_PAGE: string[] = ["/privacy", "/deleteUser", "/test"];
  static GUEST_PAGE: string[] = ["/signin", "/signup", "/forget"];
}
