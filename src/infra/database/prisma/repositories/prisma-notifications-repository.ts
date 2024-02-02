import { Injectable } from '@nestjs/common'
import { Notification } from '../../../../app/entities/notification'
import { NotificationsRepository } from '../../../../app/repositories/notifications-repository'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  // eslint-disable-next-line no-useless-constructor
  constructor(private prismaService: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    await this.prismaService.notification.create({
      data: {
        id: notification.getId(),
        content: notification.getContent().getValue(),
        category: notification.getCategory(),
        recipientId: notification.getRecipient(),
        readAt: notification.getReadAt(),
        createdAt: notification.getCreatedAt(),
      },
    })
  }
}
