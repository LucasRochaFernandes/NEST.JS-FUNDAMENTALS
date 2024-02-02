import { randomUUID } from 'crypto'
import { SendNotificationUseCase } from './send-notification-use-case'
import { NotificationsRepositoryInMemory } from '../../../test/repositories/notifications-repository-in-memory'

describe('Send Notification', () => {
  it('should be able to send notification', async () => {
    const notificationRepository = new NotificationsRepositoryInMemory()
    const sendNotification = new SendNotificationUseCase(notificationRepository)
    const { notification } = await sendNotification.execute({
      content: 'This is a notification',
      category: 'social',
      recipientId: randomUUID(),
    })
    expect(notification).toBeTruthy()
  })
})
