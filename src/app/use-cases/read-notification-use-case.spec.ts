import { NotificationsRepositoryInMemory } from '../../../test/repositories/notifications-repository-in-memory'
import { makeNotification } from '@test/factories/notification-factory'
import { ReadNotificationUseCase } from './read-notification-use-case'

describe('Read Notification', () => {
  it('should be able to read a notification', async () => {
    const notificationRepository = new NotificationsRepositoryInMemory()
    const readNotification = new ReadNotificationUseCase(notificationRepository)
    const notification = makeNotification()

    await notificationRepository.create(notification)

    await readNotification.execute({
      notificationId: notification.getId(),
    })

    expect(notificationRepository.notifications[0].getReadAt()).toEqual(
      expect.any(Date),
    )
  })
})
