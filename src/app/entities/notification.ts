import { Content } from './content'

export interface NotificationProps {
  recipientId: string
  content: Content
  category: string
  readAt?: Date | null
  createdAt: Date
}

export class Notification {
  private props: NotificationProps
  constructor(props: NotificationProps) {
    this.props = props
  }

  public setContent(content: Content) {
    this.props.content = content
  }

  public getContent(): Content {
    return this.props.content
  }

  public setRecipient(recipientId: string) {
    this.props.recipientId = recipientId
  }

  public getRecipient(): string {
    return this.props.recipientId
  }

  public setCategory(category: string) {
    this.props.category = category
  }

  public getCategory(): string {
    return this.props.category
  }

  public setReadAt(readAt: Date | null | undefined) {
    this.props.readAt = readAt
  }

  public getReadAt(): Date | null | undefined {
    return this.props.readAt
  }

  public getCreatedAt(): Date {
    return this.props.createdAt
  }
}
