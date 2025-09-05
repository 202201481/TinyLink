import { createClient } from 'redis';

// Create Redis client
let redisClient;

export const initRedis = async () => {
  try {
    redisClient = createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379',
    });

    redisClient.on('error', (err) => {
      console.error('Redis Client Error', err);
    });

    await redisClient.connect();
    console.log('Redis Client Connected');
    return redisClient;
  } catch (error) {
    console.error('Redis Connection Error:', error);
    process.exit(1);
  }
};

export const getRedisClient = () => {
  if (!redisClient) {
    throw new Error('Redis client not initialized. Call initRedis() first.');
  }
  return redisClient;
};

// Cache TTL in seconds (default: 1 hour)
const DEFAULT_CACHE_TTL = 3600;

// Set data in Redis cache
export const setCache = async (key, value, ttl = DEFAULT_CACHE_TTL) => {
  try {
    const client = getRedisClient();
    await client.set(key, JSON.stringify(value), {
      EX: ttl,
    });
    return true;
  } catch (error) {
    console.error('Redis setCache error:', error);
    return false;
  }
};

// Get data from Redis cache
export const getCache = async (key) => {
  try {
    const client = getRedisClient();
    const data = await client.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Redis getCache error:', error);
    return null;
  }
};

// Delete data from Redis cache
export const deleteCache = async (key) => {
  try {
    const client = getRedisClient();
    await client.del(key);
    return true;
  } catch (error) {
    console.error('Redis deleteCache error:', error);
    return false;
  }
};

// Clear all cache keys matching a pattern
export const clearCacheByPattern = async (pattern) => {
  try {
    const client = getRedisClient();
    const keys = await client.keys(pattern);
    if (keys.length > 0) {
      await client.del(keys);
    }
    return true;
  } catch (error) {
    console.error('Redis clearCacheByPattern error:', error);
    return false;
  }
};
