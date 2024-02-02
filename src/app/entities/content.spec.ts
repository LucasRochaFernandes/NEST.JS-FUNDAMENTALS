import { Content } from './content'

describe('Notification Content', () => {
  it('should be able to create a notification content', () => {
    const content = new Content('Você recebeu uma solicitação')
    expect(content).toBeTruthy()
  })

  it('should not be able to create a notification content with less then j5 characters', () => {
    expect(() => new Content('123')).toThrow()
  })
})
