import { Controller, Get, Post } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { randomUUID } from 'node:crypto'

@Controller('notifications')
export class NotificationsController {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async listNotifications() {
    return await this.prisma.notification.findMany()
  }

  @Post()
  async createNotification() {
    return await this.prisma.notification.create({
      data: {
        id: randomUUID(),
        content: 'Mensagem Nova',
        category: 'Social',
        recipientId: randomUUID(),
      },
    })
  }
}
