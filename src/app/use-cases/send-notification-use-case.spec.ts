import { randomUUID } from 'crypto'
import { SendNotificationUseCase } from './send-notification-use-case'

describe('Send Notification', () => {
  it('should be able to send notification', async () => {
    const sendNotification = new SendNotificationUseCase()
    const { notification } = await sendNotification.execute({
      content: 'This is a notification',
      category: 'social',
      recipientId: randomUUID(),
    })
    expect(notification).toBeTruthy()
  })
})
