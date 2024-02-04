import { randomUUID } from 'node:crypto'
import { CancelNotificationUseCase } from './cancel-notification-use-case'
import { NotificationsRepositoryInMemory } from '../../../test/repositories/notifications-repository-in-memory'
import { Notification } from '../entities/notification'
import { Content } from '../entities/content'
import { NotificationNotFoundError } from './errors/notification-not-found-error'

describe('Cancel Notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationRepository = new NotificationsRepositoryInMemory()
    const sendNotification = new CancelNotificationUseCase(
      notificationRepository,
    )
    const notification = new Notification({
      category: 'social',
      recipientId: randomUUID(),
      content: new Content('Nova solicitação'),
    })
    await notificationRepository.create(notification)

    await sendNotification.execute({
      notificationId: notification.getId(),
    })

    expect(notificationRepository.notifications[0].getCanceledAt()).toEqual(
      expect.any(Date),
    )
  })
  it('should not be able to cancel a notification when it does not exist', async () => {
    const notificationRepository = new NotificationsRepositoryInMemory()
    const sendNotification = new CancelNotificationUseCase(
      notificationRepository,
    )

    expect(async () => {
      return await sendNotification.execute({
        notificationId: randomUUID(),
      })
    }).rejects.toThrow(NotificationNotFoundError)
  })
})
