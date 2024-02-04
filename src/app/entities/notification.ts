import { Replace } from 'src/helpers/replace'
import { Content } from './content'
import { randomUUID } from 'crypto'

export interface NotificationProps {
  recipientId: string
  content: Content
  category: string
  readAt?: Date | null
  canceledAt?: Date | null
  createdAt: Date
}

export class Notification {
  private props: NotificationProps
  private id: string
  constructor(
    props: Replace<NotificationProps, { createdAt?: Date }>,
    id?: string,
  ) {
    this.id = id ?? randomUUID()
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    }
  }

  public getId() {
    return this.id
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

  public read() {
    this.props.readAt = new Date()
  }

  public unread() {
    this.props.readAt = null
  }

  public getReadAt(): Date | null | undefined {
    return this.props.readAt
  }

  public getCreatedAt(): Date {
    return this.props.createdAt
  }

  public cancel() {
    this.props.canceledAt = new Date()
  }

  public getCanceledAt(): Date | null | undefined {
    return this.props.canceledAt
  }
}
