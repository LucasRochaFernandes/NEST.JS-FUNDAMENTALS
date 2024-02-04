import { Injectable } from '@nestjs/common'
import { NotificationsRepository } from '../repositories/notifications-repository'
import { NotificationNotFoundError } from './errors/notification-not-found-error'

interface CancelNotificationUseCaseRequest {
  notificationId: string
}

@Injectable()
export class CancelNotificationUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(request: CancelNotificationUseCaseRequest): Promise<void> {
    const { notificationId } = request

    const notification =
      await this.notificationsRepository.findById(notificationId)

    if (!notification) {
      throw new NotificationNotFoundError()
    }
    notification.cancel()

    await this.notificationsRepository.save(notification)
  }
}
