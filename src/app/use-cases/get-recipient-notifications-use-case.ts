import { Injectable } from '@nestjs/common'
import { NotificationsRepository } from '../repositories/notifications-repository'
import { Notification } from '../entities/notification'

interface GetRecipientNotificationUseCaseRequest {
  recipientId: string
}

interface GetRecipientNotificationUseCaseResponse {
  notifications: Notification[]
}

@Injectable()
export class GetRecipientNotificationUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: GetRecipientNotificationUseCaseRequest,
  ): Promise<GetRecipientNotificationUseCaseResponse> {
    const { recipientId } = request

    const notifications =
      await this.notificationsRepository.findManyByRecipientId(recipientId)

    return { notifications }
  }
}
