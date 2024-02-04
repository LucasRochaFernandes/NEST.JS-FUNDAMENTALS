import { Content } from '@/app/entities/content'
import { Notification } from '@/app/entities/notification'
import { Notification as RawNotification } from '@prisma/client'

// Converte o formato do Prisma para a aplicação e vice-versa

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

  static toDomain(raw: RawNotification): Notification {
    return new Notification(
      {
        category: raw.content,
        content: new Content(raw.content),
        recipientId: raw.recipientId,
        readAt: raw.readAt,
        canceledAt: raw.canceledAt,
        createdAt: raw.createdAt,
      },
      raw.id,
    )
  }
}
