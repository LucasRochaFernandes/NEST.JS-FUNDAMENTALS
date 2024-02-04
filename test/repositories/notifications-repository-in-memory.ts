import { Notification } from '../../src/app/entities/notification'
import { NotificationsRepository } from '../../src/app/repositories/notifications-repository'

export class NotificationsRepositoryInMemory
  implements NotificationsRepository
{
  public notifications: Notification[] = []

  async countManyByRecipientId(recipientId: string): Promise<number> {
    const count = this.notifications.filter(
      (item) => item.getRecipient() === recipientId,
    ).length
    return count
  }

  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.notifications.findIndex(
      (item) => item.getId() === notification.getId(),
    )
    if (notificationIndex >= 0) {
      this.notifications[notificationIndex] = notification
    }
  }

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = this.notifications.find(
      (item) => item.getId() === notificationId,
    )
    if (!notification) {
      return null
    }
    return notification
  }

  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification)
  }
}
