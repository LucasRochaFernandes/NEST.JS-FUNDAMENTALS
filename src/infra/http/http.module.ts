import { Module } from '@nestjs/common'
import { NotificationsController } from './controllers/notifications.controller'
import { SendNotificationUseCase } from 'src/app/use-cases/send-notification-use-case'
import { DatabaseModule } from '../database/database.module'

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [SendNotificationUseCase],
})
export class HttpModule {}
