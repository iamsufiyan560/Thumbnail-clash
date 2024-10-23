import { ConnectionOptions, DefaultJobOptions } from "bullmq";

export const redisConnection: ConnectionOptions = {
  host: process.env.REDIS_HOST,
  port: 6379,
};

export const defaultQueueConfig: DefaultJobOptions = {
  removeOnComplete: {
    count: 20,
    age: 60 * 60,
  },
  attempts: 3,
  backoff: {
    type: "exponential",
    delay: 1000,
  },
};