import { HelmetOptions } from "helmet";

/**
 * Configuration file for Helmet JS<br>
 * Security headers like Content Security Policy, Frame Options are configured in this file
 * @link https://helmetjs.github.io/#reference
 */
export const helmetConfig: HelmetOptions = {
  /**
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
   */
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      baseUri: ["'self'"],
      fontSrc: ["'self'", "https:", "data:"],
      formAction: ["'self'"],
      frameAncestors: ["'self'"],
      imgSrc: ["'self'"],
      objectSrc: ["'self'"],
      scriptSrc: ["'self'"],
      scriptSrcAttr: ["'none'"],
      styleSrc: ["'self'"],
      upgradeInsecureRequests: []
    }
  },
  /**
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Embedder-Policy
   */
  /*crossOriginEmbedderPolicy: {
    policy: "require-corp"
  },*/
  /**
   * ~ <code>rel="noopener"</code>
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Opener-Policy
   */
  crossOriginOpenerPolicy: {
    policy: "same-origin"
  },
  /**
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Resource-Policy
   * @link https://resourcepolicy.fyi/
   */
  crossOriginResourcePolicy: {
    policy: "same-origin"
  },
  /*originAgentCluster: {},*/
  /**
   * ~ rel="noreferrer"
   * @link https://developer.mozilla.org/en-US/docs/Web/Security/Referer_header:_privacy_and_security_concerns
   */
  referrerPolicy: {
    policy: "no-referrer"
  },
  /**
   *
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types#mime_sniffing
   */
  strictTransportSecurity: {
    maxAge: 15552000,
    includeSubDomains: true
  },
  /**
   * true = "nosniff"
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types#mime_sniffing
   */
  xContentTypeOptions: true,
  /**
   * Non-standard, default: off
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
   */
  /*xDnsPrefetchControl: {allow: false},*/
  /*dnsPrefetchControl: {},*/
  /**
   * only for explorer
   * @link https://learn.microsoft.com/en-us/archive/blogs/ie/ie8-security-part-v-comprehensive-protection
   */
  /*xDownloadOptions: {},*/
  /**
   * legacy, obsolete
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
   * @see contentSecurityPolicy.frameAncestors
   */
  /*xFrameOptions: {},*/
  /*frameguard: {},*/
  /**
   * Default: none
   * @link https://owasp.org/www-project-secure-headers/
   */
  /*xPermittedCrossDomainPolicies: {permittedPolicies: "none"},*/
  /*permittedCrossDomainPolicies: {},*/
  /**
   * Default: header removed<br>
   * Discussion:
   * @link  https://github.com/expressjs/express/pull/2813#issuecomment-159270428
   */
  /*xPoweredBy: false,*/
  hidePoweredBy: true
  /**
   * Non-standard, buggy, should be disabled
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection
   */
  /*xXssProtection: false,*/
  /*xssFilter: {}*/
};
