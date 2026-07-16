/**
 * Adapter mínimo implementando a interface Store do express-rate-limit
 * (increment / decrement / resetKey), usando Upstash Redis como backend.
 *
 * Necessário em produção serverless: instâncias de função diferentes não
 * compartilham memória, então um rate limit em Map() comum pode ser burlado
 * simplesmente batendo em instâncias diferentes. Redis centraliza a contagem
 * pra todas as instâncias verem o mesmo estado.
 */
export default class UpstashRateLimitStore {
  constructor(redis, windowMs) {
    this.redis = redis;
    this.windowSeconds = Math.ceil(windowMs / 1000);
    this.prefix = "rl:";
  }

  async increment(key) {
    const redisKey = this.prefix + key;
    const totalHits = await this.redis.incr(redisKey);

    if (totalHits === 1) {
      await this.redis.expire(redisKey, this.windowSeconds);
    }

    const ttl = await this.redis.ttl(redisKey);
    const resetTime = new Date(Date.now() + Math.max(ttl, 0) * 1000);

    return { totalHits, resetTime };
  }

  async decrement(key) {
    await this.redis.decr(this.prefix + key);
  }

  async resetKey(key) {
    await this.redis.del(this.prefix + key);
  }
}