import { randomUUID } from 'crypto'
import { NotificationsRepositoryInMemory } from '../../../test/repositories/notifications-repository-in-memory'
import { CountRecipientNotificationUseCase } from './count-recipient-notification-use-case'
import { Content } from '../entities/content'
import { Notification } from '../entities/notification'

describe('Count Recipient Notifications', () => {
  it("should be able to count a recipient's notifications", async () => {
    const notificationRepository = new NotificationsRepositoryInMemory()
    const countNotification = new CountRecipientNotificationUseCase(
      notificationRepository,
    )
    const recipientId1 = randomUUID()
    const recipientId2 = randomUUID()

    await notificationRepository.create(
      new Notification({
        category: 'social',
        recipientId: recipientId1,
        content: new Content('Nova solicitação'),
      }),
    )
    await notificationRepository.create(
      new Notification({
        category: 'social',
        recipientId: recipientId1,
        content: new Content('Nova solicitação'),
      }),
    )
    await notificationRepository.create(
      new Notification({
        category: 'social',
        recipientId: recipientId2,
        content: new Content('Nova solicitação'),
      }),
    )

    const { count } = await countNotification.execute({
      recipientId: recipientId1,
    })
    expect(count).toEqual(2)
  })
})
