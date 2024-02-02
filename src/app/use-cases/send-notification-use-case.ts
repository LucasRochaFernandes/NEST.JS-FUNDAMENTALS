import { Injectable } from '@nestjs/common'
import { Content } from '../entities/content'
import { Notification } from '../entities/notification'
import { NotificationsRepository } from '../repositories/notifications-repository'

interface SendNotificationUseCaseRequest {
  recipientId: string
  content: string
  category: string
}

interface SendNotificationUseCaseResponse {
  notification: Notification
}

@Injectable()
export class SendNotificationUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: SendNotificationUseCaseRequest,
  ): Promise<SendNotificationUseCaseResponse> {
    const { content, recipientId, category } = request
    const notification = new Notification({
      recipientId,
      content: new Content(content),
      category,
    })

    await this.notificationsRepository.create(notification)
    return { notification }
  }
}
