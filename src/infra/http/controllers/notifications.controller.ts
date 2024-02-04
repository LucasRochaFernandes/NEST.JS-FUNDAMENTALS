import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common'
import { CreateNotificationBody } from '../dtos/create-notification-body'
import { SendNotificationUseCase } from '@/app/use-cases/send-notification-use-case'
import { NotificationViewModel } from '../view-models/notification-view-model'
import { CancelNotificationUseCase } from '@/app/use-cases/cancel-notification-use-case'
import { ReadNotificationUseCase } from '@/app/use-cases/read-notification-use-case'
import { GetRecipientNotificationUseCase } from '@/app/use-cases/get-recipient-notifications-use-case'
import { CountRecipientNotificationUseCase } from '@/app/use-cases/count-recipient-notification-use-case'

@Controller('notifications')
export class NotificationsController {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private sendNotification: SendNotificationUseCase,
    private cancelNotification: CancelNotificationUseCase,
    private readNotification: ReadNotificationUseCase,
    private getNotification: GetRecipientNotificationUseCase,
    private countNotification: CountRecipientNotificationUseCase,
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({
      notificationId: id,
    })
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({ notificationId: id })
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string) {
    const { count } = await this.countNotification.execute({ recipientId })
    return {
      count,
    }
  }

  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getNotification.execute({
      recipientId,
    })
    return { notifications: notifications.map(NotificationViewModel.toHTTP) }
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body
    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    })

    const viewModel = NotificationViewModel.toHTTP(notification)

    return { notification: viewModel }
  }
}
