import { redis } from '../redis/client'

interface GetSubscribeInviteClicksParams {
  subscriberId: string
}
export async function getSubscriberInviteClicks({
  subscriberId,
}: GetSubscribeInviteClicksParams) {
  const count = await redis.hget('referal:acess-cout', subscriberId)

  return {
    count: count ? Number.parseInt(count) : 0,
  }
}
