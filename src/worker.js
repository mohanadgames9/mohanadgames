const GOOGLE_VERIFICATION_FILES = new Map([
  ["/google64d115a53f63ae51.html", "google-site-verification: google64d115a53f63ae51.html"],
  ["/googledfa2bd03a612c26d.html", "google-site-verification: googledfa2bd03a612c26d.html"]
]);

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    const verificationBody = GOOGLE_VERIFICATION_FILES.get(pathname);
    if (verificationBody) {
      return new Response(verificationBody, {
        status: 200,
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "public, max-age=3600"
        }
      });
    }
    return env.ASSETS.fetch(request);
  }
};
