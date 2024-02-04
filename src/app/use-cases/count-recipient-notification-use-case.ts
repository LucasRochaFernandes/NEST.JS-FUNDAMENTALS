import { Injectable } from '@nestjs/common'
import { NotificationsRepository } from '../repositories/notifications-repository'

interface CountRecipientNotificationUseCaseRequest {
  recipientId: string
}

interface CountRecipientNotificationUseCaseResponse {
  count: number
}

@Injectable()
export class CountRecipientNotificationUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: CountRecipientNotificationUseCaseRequest,
  ): Promise<CountRecipientNotificationUseCaseResponse> {
    const { recipientId } = request

    const count =
      await this.notificationsRepository.countManyByRecipientId(recipientId)

    return { count }
  }
}
