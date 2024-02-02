import { randomUUID } from 'node:crypto'
import { Content } from './content'
import { Notification } from './notification'

describe('Notification', () => {
  it('should be able to create a notification', () => {
    const notification = new Notification({
      content: new Content('Conteúdo Notificação'),
      category: 'social',
      recipientId: randomUUID(),
    })
    expect(notification).toBeTruthy()
  })

  it('should not be able to create a notification content with less then j5 characters', () => {
    expect(() => new Content('123')).toThrow()
  })
})
