import { Notification } from '@/app/entities/notification'

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.getId(),
      content: notification.getContent().getValue(),
      category: notification.getCategory(),
      recipientId: notification.getRecipient(),
      readAt: notification.getReadAt(),
      createdAt: notification.getCreatedAt(),
    }
  }
}
