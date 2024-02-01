import { Body, Controller, Get, Post } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { CreateNotificationBody } from './create-notification-body'

@Controller('notifications')
export class NotificationsController {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async listNotifications() {
    return await this.prisma.notification.findMany()
  }

  @Post()
  async createNotification(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body
    return await this.prisma.notification.create({
      data: {
        content,
        category,
        recipientId,
      },
    })
  }
}
