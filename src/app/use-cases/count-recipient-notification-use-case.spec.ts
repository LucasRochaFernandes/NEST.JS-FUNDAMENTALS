import { randomUUID } from 'crypto'
import { NotificationsRepositoryInMemory } from '../../../test/repositories/notifications-repository-in-memory'
import { CountRecipientNotificationUseCase } from './count-recipient-notification-use-case'
import { makeNotification } from '@test/factories/notification-factory'

describe('Count Recipient Notifications', () => {
  it("should be able to count a recipient's notifications", async () => {
    const notificationRepository = new NotificationsRepositoryInMemory()
    const countNotification = new CountRecipientNotificationUseCase(
      notificationRepository,
    )
    const recipientId1 = randomUUID()
    const recipientId2 = randomUUID()

    await notificationRepository.create(
      makeNotification({ recipientId: recipientId1 }),
    )
    await notificationRepository.create(
      makeNotification({ recipientId: recipientId1 }),
    )
    await notificationRepository.create(
      makeNotification({ recipientId: recipientId2 }),
    )

    const { count } = await countNotification.execute({
      recipientId: recipientId1,
    })
    expect(count).toEqual(2)
  })
})
