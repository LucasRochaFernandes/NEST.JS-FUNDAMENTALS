import { Content } from '@/app/entities/content'
import { Notification, NotificationProps } from '@/app/entities/notification'
import { randomUUID } from 'crypto'

type Overrride = Partial<NotificationProps>

export function makeNotification(override: Overrride = {}) {
  return new Notification({
    category: 'social',
    recipientId: randomUUID(),
    content: new Content('Nova solicitação'),
    ...override,
  })
}
