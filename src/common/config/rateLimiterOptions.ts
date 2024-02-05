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
