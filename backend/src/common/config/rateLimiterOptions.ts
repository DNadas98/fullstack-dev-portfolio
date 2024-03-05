import {ThrottlerOptions} from "@nestjs/throttler";

/**
 * Used globally for all API endpoints<br>
 * ttl: 60000 [ms] - time to live, the time window<br>
 * limit: 100: amount of requests allowed in the TTL
 * @link https://docs.nestjs.com/security/rate-limiting
 */
export const globalRateLimiterOptions: ThrottlerOptions = {
  ttl: 60000,
  limit: 100
};

/**
 * Used at register and login endpoints<br>
 * ttl: 60000 [ms] - time to live, the time window<br>
 * limit: 6: amount of requests allowed in the TTL
 * @link https://docs.nestjs.com/security/rate-limiting
 */
export const authRateLimiterOptions: ThrottlerOptions = {
  ttl: 60000,
  limit: 6
};

/**
 * Used at mail sending endpoints<br>
 * ttl: 60000 [ms] - time to live, the time window<br>
 * limit: 3: amount of requests allowed in the TTL
 * @link https://docs.nestjs.com/security/rate-limiting
 */
export const mailRateLimiterOptions: ThrottlerOptions = {
  ttl: 60000,
  limit: 3
};

/**
 * Used at endpoints interacting with the GitHub REST API<br>
 * ttl: 3600000 [ms] = 1 h - time to live, the time window<br>
 * limit: 4990: amount of requests allowed in the TTL<br>
 * The official docs specify 5000 requests / hour as rate limit with authentication<br>
 * This rate limit is applied globally, not per user
 * @link https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api?apiVersion=2022-11-28#primary-rate-limit-for-authenticated-users
 */
export const githubApiRateLimiterOptions: ThrottlerOptions = {
  ttl: 3600000,
  limit: 4990,
  generateKey: () => "github_global_limit"
};
