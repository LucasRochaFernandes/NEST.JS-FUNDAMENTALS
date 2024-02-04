import { Injectable } from '@nestjs/common'
import { NotificationsRepository } from '../repositories/notifications-repository'
import { NotificationNotFoundError } from './errors/notification-not-found-error'

interface ReadNotificationUseCaseRequest {
  notificationId: string
}

@Injectable()
export class ReadNotificationUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(request: ReadNotificationUseCaseRequest): Promise<void> {
    const { notificationId } = request

    const notification =
      await this.notificationsRepository.findById(notificationId)

    if (!notification) {
      throw new NotificationNotFoundError()
    }
    notification.read()

    await this.notificationsRepository.save(notification)
  }
}
