import { redis } from '../redis/client'

interface AccessInviteLink {
	subscriberId: string
}
export async function accessInviteLink({
	subscriberId,
}: AccessInviteLink) {
	redis.hincrby('referal:acess-cout', subscriberId, 1)
}
