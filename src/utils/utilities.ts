export const getSsrLanguage = (ctx) => {
  const {
    query: { lng },
    locale,
  } = ctx;
  return lng ? lng : locale ? locale : "en";
};

export const getSsrHeader = (ctx) => {
  const { req } = ctx;
  const language = getSsrLanguage(ctx);
  let headers = { "Accept-Language": language };
  if (req && req.headers) {
    if (req.headers["x-forwarded-for"]) {
      headers["x-forwarded-for"] = req.headers["x-forwarded-for"];
    }
    // forwarding cloudfront-viewer-country and viewer-country headers that are use to determine user location
    if (req.headers["cloudfront-viewer-country"]) {
      headers["viewer-country"] = req.headers["cloudfront-viewer-country"];
      headers["cloudfront-viewer-country"] =
        req.headers["cloudfront-viewer-country"];
    }
  }
  return headers;
};

export const addCookie = (key, value, expiry = 0) => {
  const domain = window.location.hostname;
  document.cookie = `${key}=${value};domain=${domain};path=/${
    expiry ? `;Expires=${expiry}` : ""
  }`;
};
