import { randomUUID } from 'node:crypto'
import { CancelNotificationUseCase } from './cancel-notification-use-case'
import { NotificationsRepositoryInMemory } from '../../../test/repositories/notifications-repository-in-memory'
import { NotificationNotFoundError } from './errors/notification-not-found-error'
import { makeNotification } from '@test/factories/notification-factory'

describe('Cancel Notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationRepository = new NotificationsRepositoryInMemory()
    const sendNotification = new CancelNotificationUseCase(
      notificationRepository,
    )
    const notification = makeNotification()

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
