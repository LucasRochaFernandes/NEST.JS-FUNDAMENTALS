import { randomUUID } from 'crypto'
import { NotificationsRepositoryInMemory } from '../../../test/repositories/notifications-repository-in-memory'
import { makeNotification } from '@test/factories/notification-factory'
import { GetRecipientNotificationUseCase } from './get-recipient-notifications-use-case'

describe('Get Recipient Notifications', () => {
  it('should be able to get recipient notifications', async () => {
    const notificationRepository = new NotificationsRepositoryInMemory()
    const getNotifications = new GetRecipientNotificationUseCase(
      notificationRepository,
    )
    const recipientId = randomUUID()

    const n1 = makeNotification({ recipientId })
    const n2 = makeNotification({ recipientId })
    await notificationRepository.create(n1)
    await notificationRepository.create(n2)

    const { notifications } = await getNotifications.execute({
      recipientId,
    })
    expect(notifications).toHaveLength(2)
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining(n1),
        expect.objectContaining(n2),
      ]),
    )
  })
})
