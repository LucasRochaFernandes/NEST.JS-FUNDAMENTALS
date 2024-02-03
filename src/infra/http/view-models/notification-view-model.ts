import { Notification } from '@/app/entities/notification'

export class NotificationViewModel {
  static toHTTP(notification: Notification) {
    return {
      id: notification.getId(),
      content: notification.getContent().getValue(),
      category: notification.getCategory(),
      recipientId: notification.getRecipient(),
    }
  }
}
