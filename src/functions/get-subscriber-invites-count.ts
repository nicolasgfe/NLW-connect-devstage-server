import { redis } from '../redis/client'

interface GetSubscribeInviteCountParams {
  subscriberId: string
}
export async function getSubscriberInviteCount({
  subscriberId,
}: GetSubscribeInviteCountParams) {
  const count = await redis.zscore('referral:ranking', subscriberId)

  return {
    count: count ? Number.parseInt(count) : 0,
  }
}
